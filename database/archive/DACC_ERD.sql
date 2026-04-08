CREATE TABLE Users (
  Id INT PRIMARY KEY,
  FullName NVARCHAR(255),
  Email VARCHAR(255),
  Password VARCHAR(255),
  Role VARCHAR(50),
  CreatedAt DATETIME
);

CREATE TABLE Tables (
  TableID INT PRIMARY KEY,
  TableNumber INT,
  Capacity INT,
  Status VARCHAR(50),
  CreatedAt DATETIME
);

CREATE TABLE Reservations (
  ReservationID INT PRIMARY KEY,
  UserID INT NOT NULL,
  FullName NVARCHAR(255),
  Email VARCHAR(255),
  Phone VARCHAR(50),
  ReservationDate DATE,
  ReservationTime VARCHAR(20),
  NumberOfGuests INT,
  TableID INT NOT NULL,
  SpecialRequests NVARCHAR(MAX),
  Status VARCHAR(50),
  CreatedAt DATETIME,
  UpdatedAt DATETIME,
  FOREIGN KEY (UserID) REFERENCES Users(Id),
  FOREIGN KEY (TableID) REFERENCES Tables(TableID)
);

CREATE TABLE Dishes (
  DishID INT PRIMARY KEY,
  DishName NVARCHAR(255),
  Price DECIMAL(10,2),
  Category NVARCHAR(50),
  ImageUrl NVARCHAR(MAX),
  Description NVARCHAR(MAX),
  Featured BIT,
  IsVisible BIT,
  CreatedAt DATETIME
);

CREATE TABLE Articles (
  ArticleID INT PRIMARY KEY,
  Title NVARCHAR(255),
  Summary NVARCHAR(500),
  Content NVARCHAR(MAX),
  ImageUrl NVARCHAR(MAX),
  IsVisible BIT,
  CreatedAt DATETIME,
  UpdatedAt DATETIME
);

CREATE TABLE Orders (
  OrderID INT PRIMARY KEY,
  UserID INT NOT NULL,
  TotalAmount DECIMAL(10,2),
  Status VARCHAR(50),
  CreatedAt DATETIME,
  FOREIGN KEY (UserID) REFERENCES Users(Id)
);

CREATE TABLE OrderDetails (
  OrderDetailID INT PRIMARY KEY,
  OrderID INT NOT NULL,
  DishID INT NOT NULL,
  Quantity INT,
  UnitPrice DECIMAL(10,2),
  FOREIGN KEY (OrderID) REFERENCES Orders(OrderID),
  FOREIGN KEY (DishID) REFERENCES Dishes(DishID)
);
