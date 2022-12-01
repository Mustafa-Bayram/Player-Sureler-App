class AyetPlayer {
  constructor(ayetList){
    this.ayetList = ayetList;
    this.index = 0;
  }

  getAyet(){
    return this.ayetList[this.index];
  }

  next(){
    if (this.index + 1 < this.ayetList.length) {
      this.index++;   
    }else{
      this.index = 0;
    }
  }

  prev(){
    if (this.index != 0) {
      this.index--;
    }else{
      this.index = this.ayetList.length - 1;
    }
  }
}