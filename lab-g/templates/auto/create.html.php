<?php
/** @var \App\Model\Auto $auto */
/** @var \App\Service\Router $router */

$title = 'Create Auto';
$bodyClass = "edit";

ob_start(); ?>
    <h1>Create Auto</h1>
    <form action="<?= $router->generatePath('auto-create') ?>" method="post" class="edit-form">
        <?php require __DIR__ . DIRECTORY_SEPARATOR . '_form.html.php'; ?>
        <input type="hidden" name="action" value="auto-create">
    </form>

    <a href="<?= $router->generatePath('auto-index') ?>">Back to list</a>
<?php $main = ob_get_clean();

include __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'base.html.php';

