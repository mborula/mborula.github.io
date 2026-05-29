<?php

namespace App\Controller;

use App\Exception\NotFoundException;
use App\Model\Auto;
use App\Service\Router;
use App\Service\Templating;


class AutoController
{
    public function indexAction(Templating $templating, Router $router): ?string
    {
        $autos = Auto::findAll();
        $html = $templating->render('auto/index.html.php', [
            'autos' => $autos,
            'router' => $router,
        ]);
        return $html;
    }

    public function createAction(?array $requestAuto, Templating $templating, Router $router): ?string
    {
        if ($requestAuto) {
            $auto = Auto::fromArray($requestAuto);
            // @todo missing validation
            $auto->save();

            $path = $router->generatePath('auto-index');
            $router->redirect($path);
            return null;
        } else {
            $auto = new Auto();
        }

        $html = $templating->render('auto/create.html.php', [
            'auto' => $auto,
            'router' => $router,
        ]);
        return $html;
    }

    public function editAction(int $autoId, ?array $requestAuto, Templating $templating, Router $router): ?string
    {
        $auto = Auto::find($autoId);
        if (! $auto) {
            throw new NotFoundException("Missing auto with id $autoId");
        }
        if ($requestAuto) {
            $auto->fill($requestAuto);
            // @todo missing validation
            $auto->save();
            $path = $router->generatePath('auto-index');
            $router->redirect($path);
            return null;
        }
        $html = $templating->render('auto/edit.html.php', [
            'auto' => $auto,
            'router' => $router,
        ]);
        return $html;
    }

    public function showAction(int $autoId, Templating $templating, Router $router): ?string
    {
        $auto = Auto::find($autoId);
        if (! $auto) {
            throw new NotFoundException("Missing auto with id $autoId");
        }

        $html = $templating->render('auto/show.html.php', [
            'auto' => $auto,
            'router' => $router,
        ]);
        return $html;
    }
    public function deleteAction(int $autoId, Router $router): ?string
    {
        $auto = Auto::find($autoId);
        if (! $auto) {
            throw new NotFoundException("Missing auto with id $autoId");
        }

        $auto->delete();
        $path = $router->generatePath('auto-index');
        $router->redirect($path);
        return null;
    }


}