<?php
/** @var \App\Model\Auto $auto */
/** @var \App\Service\Router $router */

$title = "Edit Auto {$auto->getName()} ({$auto->getId()})";
$bodyClass = "edit";

ob_start(); ?>
    <h1><?= $title ?></h1>
    <form action="<?= $router->generatePath('auto-edit') ?>" method="post" class="edit-form">
        <?php require __DIR__ . DIRECTORY_SEPARATOR . '_form.html.php'; ?>
        <input type="hidden" name="action" value="auto-edit">
        <input type="hidden" name="id" value="<?= $auto->getId() ?>">
    </form>

    <ul class="action-list">
        <li><a href="<?= $router->generatePath('auto-index') ?>">Back to list</a></li>
        <li>
            <form action="<?= $router->generatePath('auto-delete') ?>" method="post">
                <input type="submit" value="Delete" onclick="return confirm('Are you sure?')">
                <input type="hidden" name="action" value="auto-delete">
                <input type="hidden" name="id" value="<?= $auto->getId() ?>">
            </form>
        </li>
    </ul>

<?php $main = ob_get_clean();

include __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'base.html.php';

