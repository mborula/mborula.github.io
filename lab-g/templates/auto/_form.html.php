<?php
    /** @var $auto ?\App\Model\Auto */
?>
<div class="form-group">
    <label for="name">Name</label>
    <input type="text" id="name" name="auto[name]" value="<?= $auto ? $auto->getName() : '' ?>">
</div>

<div class="form-group">
    <label for="year">Year</label>
    <input type="text" id="year" name="auto[year]" value="<?= $auto ? $auto->getYear() : '' ?>">
</div>

<div class="form-group">
    <label for="price">Price</label>
    <input type="text" id="price" name="auto[price]" value="<?= $auto ? (string)$auto->getPrice() : '' ?>">
</div>

<div class="form-group">
    <label for="description">Description</label>
    <textarea id="description" name="auto[description]"><?= $auto ? $auto->getDescription() : '' ?></textarea>
</div>

<div class="form-group">
    <label></label>
    <input type="submit" value="Submit">
</div>

