from sqlalchemy import Integer, String
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column

class Base(DeclarativeBase):
    pass

class Gym(Base):
    __tablename__ = "GymData"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(30))
    count: Mapped[int]
    time: Mapped[str] = mapped_column(String(30))
    status: Mapped[bool]