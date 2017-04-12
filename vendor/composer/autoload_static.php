<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInit13a09804a2dd4b64f4a5d44ce8590752
{
    public static $prefixesPsr0 = array (
        'R' => 
        array (
            'RelativeTime' => 
            array (
                0 => __DIR__ . '/..' . '/mpratt/relativetime/Lib',
            ),
        ),
        'J' => 
        array (
            'JamesMoss\\Flywheel\\' => 
            array (
                0 => __DIR__ . '/..' . '/jamesmoss/flywheel/src',
                1 => __DIR__ . '/..' . '/jamesmoss/flywheel/test',
            ),
        ),
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixesPsr0 = ComposerStaticInit13a09804a2dd4b64f4a5d44ce8590752::$prefixesPsr0;

        }, null, ClassLoader::class);
    }
}
