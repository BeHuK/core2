<?php

namespace Core2;
/**
 * Позволяет модулям генерировать события
 */
interface Event
{

    /**
     * Проверка, требуется ли генерировать событие
     *
     * @return bool
     */
    public function check() : bool;

    /**
     * Инициация события
     * Результат в виде строки должен быть выведен в буфер
     * если буфер пуст, событие не всплывает
     *
     * @return void
     */
    public function dispatch() : void;
}