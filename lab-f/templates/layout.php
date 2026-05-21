

<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <title>Konwerter danych</title>
    <style>
        body { font-family: monospace; max-width: 900px; margin: 2rem auto; padding: 0 1rem; }
        textarea, pre { width: 100%; box-sizing: border-box; font-family: monospace; font-size: 13px; }
        textarea { height: 160px; }
        pre { background: #f4f4f4; padding: 1rem; min-height: 100px; white-space: pre-wrap; }
        select, button { font-size: 14px; padding: 4px 10px; }
        .row { display: flex; gap: 1rem; align-items: center; margin: 0.5rem 0; }
        .error { color: red; }
    </style>
</head>
<body>
<h1>Konwerter CSV / SSV / TSV / JSON / YAML</h1>

<?php if ($error): ?>
    <p class="error">Błąd: <?= htmlspecialchars($error) ?></p>
<?php endif; ?>

<form method="POST" autocomplete="off">
    <div class="row">
        <label>Format wejściowy:
            <select name="inFmt">
                <?php foreach (['CSV','SSV','TSV','JSON','YAML'] as $fmt): ?>
                    <option value="<?= $fmt ?>" <?= $inFmt === $fmt ? 'selected' : '' ?>>
                        <?= $fmt ?>
                    </option>
                <?php endforeach; ?>
            </select>
        </label>
        <label>Format wyjściowy:
            <select name="outFmt">
                <?php foreach (['CSV','SSV','TSV','JSON','YAML'] as $fmt): ?>
                    <option value="<?= $fmt ?>" <?= $outFmt === $fmt ? 'selected' : '' ?>>
                        <?= $fmt ?>
                    </option>
                <?php endforeach; ?>
            </select>
        </label>
    </div>

    <textarea name="input" autocomplete="off" placeholder="Wklej dane wejściowe..."><?= htmlspecialchars($input) ?></textarea>

    <button type="submit">Convert</button>
</form>

<h2>Wynik:</h2>
<pre><?= htmlspecialchars($output) ?></pre>

</body>
</html>
