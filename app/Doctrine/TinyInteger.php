<?php

namespace App\Doctrine;

use Doctrine\DBAL\ParameterType;
use Doctrine\DBAL\Platforms\AbstractPlatform;
use Doctrine\DBAL\Types\Type;

/**
 * @author dmitry-kulikov
 * @see https://github.com/laravel/framework/issues/8840
 */
class TinyInteger extends Type
{
    /**
     * The name of the custom type.
     */
    public const NAME = 'tinyinteger';

    /**
     * {@inheritdoc}
     */
    public function convertToPHPValue($value, AbstractPlatform $platform)
    {
        return $value === null ? null : (int)$value;
    }

    /**
     * {@inheritdoc}
     */
    public function getSQLDeclaration(array $column, AbstractPlatform $platform): string
    {
        $unsigned = !empty($column['unsigned']) ? ' UNSIGNED' : '';
        $autoincrement = !empty($column['autoincrement']) ? ' AUTO_INCREMENT' : '';

        return 'TINYINT' . $unsigned . $autoincrement;
    }

    /**
     * {@inheritdoc}
     */
    public function getName(): string
    {
        return static::NAME;
    }

    /**
     * {@inheritdoc}
     */
    public function getBindingType(): int
    {
        return ParameterType::INTEGER;
    }
}
