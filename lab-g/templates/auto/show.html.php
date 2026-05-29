<?php
/** @var \App\Model\Auto $auto */
/** @var \App\Service\Router $router */

$title = "Auto {$auto->getName()} ({$auto->getId()})";
$bodyClass = "show";

ob_start(); ?>
    <h1><?= $auto->getName() ?></h1>

    <p><strong>Year:</strong> <?= $auto->getYear() ?></p>
    <p><strong>Price:</strong> <?= (string)$auto->getPrice() ?></p>
    <p><strong>Description:</strong><br><?= $auto->getDescription() ?></p>

    <ul class="action-list">
        <li><a href="<?= $router->generatePath('auto-index') ?>">Back to list</a></li>
        <li><a href="<?= $router->generatePath('auto-edit', ['id' => $auto->getId()]) ?>">Edit</a></li>
    </ul>

<?php $main = ob_get_clean();

include __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'base.html.php';

