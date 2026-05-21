<?php // I:\kopia\sem4\Podstawy technologi webowych\mborula.github.io\lab-f\yaml.php

$data = [
    'name' => 'Artur Karczmarczyk',
    'index' => '3346',
    'date' => date(DATE_ATOM),
];

$yaml = yaml_emit($data);

echo $yaml;
