<?php
namespace Core2;
require_once 'Db.php';

use Laminas\Authentication\AuthenticationService;
use Laminas\Authentication\Result;
use Laminas\Authentication\Adapter\Ldap as LdapAdapter;
use Laminas\Ldap\Ldap;

class LdapAuth extends Db {
	const ST_LDAP_AUTH_SUCCESS 		= 1;
	const ST_LDAP_USER_NOT_FOUND	= 2;
	const ST_LDAP_INVALID_PASSWORD	= 3;
	const ST_ERROR 					= 4;
		
	private $status = null;
	private $message = null;
	private $userData = array();
	private $userFields = array(
		'givenname' => 'firstname',
		'sn' 		=> 'lastname',
		'mail' 		=> 'email',
	);

	public function setUserFields($userFields) {
		$this->userFields = $userFields;
	}
	
	private function setStatus($status) {
		$this->status = $status;
	}
	
	public function getStatus() {
		return $this->status;
	}
	
	private function setMessage($message) {
		$this->message = $message;
	}
	
	public function getMessage() {
		return  $this->message;
	}
	
	private function setUserData($userData) {
		$this->userData = $userData;
	}
	
	public function getUserData() {
		return  $this->userData;
	}

	/**
	 * LDAP auth only
	 * @param $login
	 * @param $password
	 * @throws \Exception
	 */
	public function auth($login, $password) {
		try {
			$auth = new AuthenticationService();
			$config = \Zend_Registry::getInstance()->get('config');
			$log_path = $config->ldap->log_path;
			$root = $config->ldap->root;
			$admin = $config->ldap->admin;
			$role_id = $config->ldap->role_id;
			$options = $config->ldap->toArray();
			unset($options['active']);
			unset($options['log_path']);
			unset($options['root']);
			unset($options['admin']);
			unset($options['role_id']);
			$adapter = new LdapAdapter($options, $login, $password);
			$result = $auth->authenticate($adapter);
			if (!$result->isValid()) {
				// Authentication failed; print the reasons why
                $code = $result->getCode();
				switch ($code) {

					case Result::FAILURE_IDENTITY_NOT_FOUND:
						$this->setStatus(LdapAuth::ST_LDAP_USER_NOT_FOUND);
						break;

					case Result::FAILURE_CREDENTIAL_INVALID:
						$this->setStatus(LdapAuth::ST_LDAP_INVALID_PASSWORD);
						break;

				}

				$msg = '';
				foreach ($result->getMessages() as $i => $message) {
                    if ($i < 2) continue; // Messages from position 2 and up are informational messages from the LDAP

					$msg .= "$message\n";
				}
				throw new \Exception($msg);
			}
			else {
				if ($result->getIdentity() !== $auth->getIdentity()) {
					throw new \Exception('Ошибка аутентификации');
				}
				$this->setStatus(LdapAuth::ST_LDAP_AUTH_SUCCESS);
				$userData = array('login' => $result->getIdentity());
				$userData['root'] = false;
				$userData['admin'] = false;
				if ($root === $userData['login']) {
					$userData['root'] = true;
				}
				if ($admin === $userData['login']) {
					$userData['admin'] = true;
				}
				//$ldapInfo = $this->getLdapInfo($userData['login']);
                $userData['role_id'] = $role_id;
				$this->setUserData($userData);
			}

		} catch (\Exception $e) {
			if (!$this->status) $this->setStatus(LdapAuth::ST_ERROR);
			$this->setMessage($e->getMessage());
		}
	}

    /**
     * @param $login
     */
	public function getLdapInfo($login) {

		$config = \Zend_Registry::getInstance()->get('config');
		$options = $config->ldap->toArray();
		unset($options['active']);
		unset($options['log_path']);
		unset($options['root']);
		unset($options['admin']);
		unset($options['role_id']);
		$options = current($options);
		//echo "<PRE>";print_r($options);echo "</PRE>";die;
		//$options['accountCanonicalForm'] = 2;
		//$options['bindRequiresDn'] = true;
		//$options['username'] = 'AIS-LdapRead';
		//$options['password'] = 'AIS-LdapRead@1';
		$u_id = $this->db->fetchOne("SELECT `u_id` FROM `core_users` WHERE `u_login` = ?", $login);
		if (!$u_id) return;

		$key = 'profile_' . md5($login);
		if (!($this->cache->test($key))) {
			$ldap = new Ldap($options);
			$ldap->bind();
			$temp = explode('\\', $login);
			if (isset($temp[1])) $login = $temp[1];
			$hm = $ldap->search("(samaccountname={$login})", $options['baseDn'], null,
				array('mail', 'cn', 'sn', 'givenname', 'homephone', 'mobile', 'title'));
			$data = $hm->getFirst();

			//echo "<PRE>";print_r($data);echo "</PRE>";die;

			$this->db->update('core_users',
				array('email' => $data['mail'][0]),
				$this->db->quoteInto('u_id=?', $u_id)
			);
			$profile_id = $this->db->fetchOne("SELECT `id` FROM `core_users_profile` WHERE `user_id` = ?", $u_id);
			if ($profile_id) {
				$this->db->update('core_users_profile',
					array('lastname' => $data['sn'][0],
						'firstname' => $data['givenname'][0]
					),
					$this->db->quoteInto('id=?', $profile_id)
				);
			} else {
				$this->db->insert('core_users_profile', array(
					'user_id' => $u_id,
					'lastname' => $data['sn'][0],
					'firstname' => $data['givenname'][0]
				));
			}
			//$this->auth->LN = $data['sn'][0];
			//$this->auth->FN = $data['givenname'][0];
			$this->cache->save($login, $key, array('core_users'));
		}
	}
}
