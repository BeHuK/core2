

ALTER TABLE mod_billing_operations ADD COLUMN `discount_name` varchar(255) DEFAULT NULL AFTER `paid_operation`;
ALTER TABLE mod_billing_operations ADD COLUMN `discount_price` decimal(11,2) DEFAULT NULL AFTER `discount_name`;
ALTER TABLE mod_billing_operations ADD COLUMN `shipping_name` varchar(255) DEFAULT NULL AFTER `discount_price`;
ALTER TABLE mod_billing_operations ADD COLUMN `shipping_price` decimal(11,2) DEFAULT NULL AFTER `shipping_name`;
ALTER TABLE mod_billing_operations ADD COLUMN `tax` decimal(11,2) DEFAULT NULL AFTER `shipping_price`;
ALTER TABLE mod_billing_operations ADD COLUMN `currency` VARCHAR(20) DEFAULT NULL AFTER `tax`;

UPDATE mod_webservice_regapikeys
   SET transfer_sw = 'address'
WHERE title = 'Для биллинга'
  AND type_sw = 'api'
  AND transfer_sw = 'header';


INSERT IGNORE INTO mod_cron_jobs (title, description, module_id, module_method, is_active_sw, schedule_type, schedule_simple, schedule_advanced_minutes, schedule_advanced_hours, schedule_advanced_days, schedule_advanced_month, schedule_advanced_weekdays, execute_type, execute_from, execute_to, is_send_email_sw, date_laststart, lastupdate)
VALUES ('Напоминание об оплате', null, 'billing', 'cronReminderPay', 'Y', 'simple', 'daily', null, null, null, null, null, 'no_limited', null, null, 'Y', null, NOW());

INSERT IGNORE INTO mod_cron_jobs (title, description, module_id, module_method, is_active_sw, schedule_type, schedule_simple, schedule_advanced_minutes, schedule_advanced_hours, schedule_advanced_days, schedule_advanced_month, schedule_advanced_weekdays, execute_type, execute_from, execute_to, is_send_email_sw, date_laststart, lastupdate)
VALUES ('Проверка оплат пополнений', null, 'billing', 'cronCheckOperations', 'Y', 'advanced', 'hourly', '0,10,20,30,40,50', 'all', 'all', 'all', 'all', 'no_limited', null, null, 'Y', null, NOW());

INSERT IGNORE INTO mod_cron_jobs (title, description, module_id, module_method, is_active_sw, schedule_type, schedule_simple, schedule_advanced_minutes, schedule_advanced_hours, schedule_advanced_days, schedule_advanced_month, schedule_advanced_weekdays, execute_type, execute_from, execute_to, is_send_email_sw, date_laststart, lastupdate)
VALUES ('Автоматическое продление лицензий', null, 'billing', 'cronLicenseRenewals', 'Y', 'advanced', 'hourly', '0', '0', 'all', 'all', 'all', 'no_limited', null, null, 'Y', null, NOW());
