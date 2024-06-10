class File {
  constructor(name, size, createdTime, updatedTime, isDirectory) {
    this.name = name;
    this.size = size;
    this.createdTime = createdTime;
    this.updatedTime = updatedTime;
    this.isDirectory = isDirectory;
  }
}

export default File;
