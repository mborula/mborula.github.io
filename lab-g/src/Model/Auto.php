<?php
namespace App\Model;

use App\Service\Config;

class Auto
{
    private ?int $id = null;
    private ?string $name = null;
    private ?string $year = null;
    private ?float $price = null;
    private ?string $description = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function setId(?int $id): Auto
    {
        $this->id = $id;
        return $this;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(?string $name): Auto
    {
        $this->name = $name;
        return $this;
    }

    public function getYear(): ?string
    {
        return $this->year;
    }

    public function setYear(?string $year): Auto
    {
        $this->year = $year;
        return $this;
    }

    public function getPrice(): ?float
    {
        return $this->price;
    }

    public function setPrice(?float $price): Auto
    {
        $this->price = $price;
        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): Auto
    {
        $this->description = $description;
        return $this;
    }



    public static function fromArray($array): Auto
    {
        $auto = new self();
        $auto->fill($array);

        return $auto;
    }

    public function fill($array): Auto
    {
        if (isset($array['id']) && ! $this->getId()) {
            $this->setId($array['id']);
        }
        if (isset($array['name'])) {
            $this->setName($array['name']);
        }
        if (isset($array['year'])) {
            $this->setYear($array['year']);
        }
        if (isset($array['price'])) {
            $this->setPrice($array['price']);
        }
        if (isset($array['description'])) {
            $this->setDescription($array['description']);
        }

        return $this;
    }

    public static function findAll(): array
    {
        $pdo = new \PDO(Config::get('db_dsn'), Config::get('db_user'), Config::get('db_pass'));
        $sql = 'SELECT * FROM auto';
        $statement = $pdo->prepare($sql);
        $statement->execute();

        $autos = [];
        $autosArray = $statement->fetchAll(\PDO::FETCH_ASSOC);
        foreach ($autosArray as $autoArray) {
            $autos[] = self::fromArray($autoArray);
        }

        return $autos;
    }

    public static function find($id): ?Auto
    {
        $pdo = new \PDO(Config::get('db_dsn'), Config::get('db_user'), Config::get('db_pass'));
        $sql = 'SELECT * FROM auto WHERE id = :id';
        $statement = $pdo->prepare($sql);
        $statement->execute(['id' => $id]);

        $autoArray = $statement->fetch(\PDO::FETCH_ASSOC);
        if (! $autoArray) {
            return null;
        }
        $auto = Auto::fromArray($autoArray);

        return $auto;
    }

    public function save(): void
    {
        $pdo = new \PDO(Config::get('db_dsn'), Config::get('db_user'), Config::get('db_pass'));
        if (! $this->getId()) {
            $sql = "INSERT INTO auto (name, year, price, description) VALUES (:name, :year, :price, :description)";
            $statement = $pdo->prepare($sql);
            $statement->execute([
                'name' => $this->getName(),
                'year' => $this->getYear(),
                'price' => $this->getPrice(),
                'description' => $this->getDescription()
            ]);

            $this->setId($pdo->lastInsertId());
        } else {
            $sql = "UPDATE auto SET name = :name, year = :year, price = :price, description = :description WHERE id = :id";
            $statement = $pdo->prepare($sql);
            $statement->execute([
                ':name' => $this->getName(),
                ':year' => $this->getYear(),
                ':price' => $this->getPrice(),
                ':description' => $this->getDescription(),
                ':id' => $this->getId(),
            ]);
        }
    }

    public function delete(): void
    {
        $pdo = new \PDO(Config::get('db_dsn'), Config::get('db_user'), Config::get('db_pass'));
        $sql = "DELETE FROM auto WHERE id = :id";
        $statement = $pdo->prepare($sql);
        $statement->execute([
            ':id' => $this->getId(),
        ]);

        $this->setId(null);
        $this->setName(null);
        $this->setYear(null);
        $this->setPrice(null);
        $this->setDescription(null);
    }
}