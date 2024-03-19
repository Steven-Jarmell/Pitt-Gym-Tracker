from sqlalchemy import Integer, String, Boolean, DateTime
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column


class Base(DeclarativeBase):
    pass


class Gym(Base):
    __tablename__ = "gymdata"

    name: Mapped[str] = mapped_column(String(100), primary_key=True)
    count: Mapped[int] = mapped_column(Integer, primary_key=True)
    last_updated: Mapped[DateTime] = mapped_column(DateTime, primary_key=True)
    status: Mapped[bool] = mapped_column(Boolean, primary_key=True)

    def __str__(self):
        return f"{{\n\tName: {self.name}\n\tCount: {self.count}\n\LastUpdated: {self.last_updated}\n\tStatus: {self.status}\n}}"
