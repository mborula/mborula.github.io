<?php

/** @var \App\Model\Auto[] $autos */
/** @var \App\Service\Router $router */

$title = 'Auto List';
$bodyClass = 'index';

ob_start(); ?>
    <h1>Autos List</h1>

    <a href="<?= $router->generatePath('auto-create') ?>">Create new</a>

    <ul class="index-list">
        <?php foreach ($autos as $auto): ?>
            <li><h3><?= $auto->getName() ?></h3>
                <ul class="action-list">
                    <li><a href="<?= $router->generatePath('auto-show', ['id' => $auto->getId()]) ?>">Details</a></li>
                    <li><a href="<?= $router->generatePath('auto-edit', ['id' => $auto->getId()]) ?>">Edit</a></li>
                </ul>
            </li>
        <?php endforeach; ?>
    </ul>

<?php $main = ob_get_clean();

include __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'base.html.php';
