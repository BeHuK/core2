<?php

/**
 * Interface Billing_Control
 */
interface Billing_Control {

    /**
     * Списание
     * @param int    $operation_id Идентификатор операции
     * @param string $date_disable Новая дата отключения
     * @return void
     */
    public function billingExpense($operation_id, $date_disable = null);


    /**
     * Пополнение
     * @param int $operation_id Идентификатор операции
     * @return void
     */
    public function billingCreateComing($operation_id);


    /**
     * Проверка, активна ли система
     * @return bool
     */
    public function billingIsDisable();


    /**
     * Получение страницы блокировки
     * @return string
     */
    public function billingGetDisablePage();


    /**
     * Создание списания после подтверждения платежа
     * @param string $operation_name
     * @param string $operation_num
     * @param string $currency
     */
    public function billingCreateExpense($operation_name, $operation_num, $currency = null);


    /**
     * Получение даты отключения
     * @return string
     */
    public function billingGetDateDisable();


    /**
     * Получение баланса
     * @return float
     */
    public function billingGetBalance();


    /**
     * История платежей
     * @return string
     */
    public function billingGetListHistory();


    /**
     * Автоматическое продление лицензий
     */
    public function billingCronLicenseRenewals();


    /**
     * Напоминание об оплате
     */
    public function billingCronReminderPay();
}