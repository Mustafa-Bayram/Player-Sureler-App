class Ayet {
  constructor(title, reciter, img, file) {
    this.title = title;
    this.reciter = reciter;
    this.img = img;
    this.file = file;
  }

  getName() {
    return this.title + " - " + this.reciter;
  }
}

const ayetList = [
  new Ayet("Murselat Suresi", "Sherif Mostafa", "4.jpeg", "4.mp3"),
  new Ayet("Zilzal Suresi", "İslam Subhi", "3.jpg", "1 (2).mp3"),
  new Ayet("Duha Suresi", "İslam Subhi", "4.jpeg", "1 (3).mp3"),
  new Ayet("Şems Suresi", "İslam Subhi", "3.jpg", "1 (1).mp3"),
];
