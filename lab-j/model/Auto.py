from sqlalchemy import create_engine, Column, Integer, String, Float
from sqlalchemy.orm import declarative_base, sessionmaker

Base = declarative_base()

engine = create_engine("sqlite:///autos.db")

Session = sessionmaker(
    bind=engine,
    expire_on_commit=False
)


class Auto(Base):
    __tablename__ = "auto"

    id = Column(Integer, primary_key=True)
    name = Column(String(255))
    year = Column(String(10))
    price = Column(Float)
    description = Column(String(1000))

    @classmethod
    def find_all(cls):
        session = Session()
        autos = session.query(cls).all()
        session.close()
        return autos

    @classmethod
    def find(cls, auto_id):
        session = Session()
        auto = session.query(cls).filter_by(id=auto_id).first()
        session.close()
        return auto

    @classmethod
    def from_dict(cls, data):
        return cls(
            name=data.get("name"),
            year=data.get("year"),
            price=float(data.get("price") or 0),
            description=data.get("description")
        )

    def fill(self, data):
        self.name = data.get("name")
        self.year = data.get("year")
        self.price = float(data.get("price") or 0)
        self.description = data.get("description")

    def save(self):
        session = Session()
        session.add(self)
        session.commit()
        session.close()

    def delete(self):
        session = Session()

        obj = session.merge(self)
        session.delete(obj)

        session.commit()
        session.close()


Base.metadata.create_all(engine)