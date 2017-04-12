<?php

require 'vendor/autoload.php'; // Подключение библиотек

$dir = __DIR__.'/data'; // указываем хранилище данных

$config = new \JamesMoss\Flywheel\Config($dir, array(
    'formatter' => new \JamesMoss\Flywheel\Formatter\JSON,
));

$repo = new \JamesMoss\Flywheel\Repository('shouts', $config);
    
// сохраняем полученные сообщения в хранилище данных

if(isset($_POST["name"]) && isset($_POST["comment"])) {
    
    $name = htmlspecialchars($_POST["name"]);
    $name = str_replace(array("\n", "\r"), '', $name);

    $comment = htmlspecialchars($_POST["comment"]);
    $comment = str_replace(array("\n", "\r"), '', $comment);
    
    $shout = new \JamesMoss\Flywheel\Document(array(
        'text' => $comment,
        'name' => $name,
        'createdAt' => time()
    ));
    
    $repo->store($shout);
    
}
