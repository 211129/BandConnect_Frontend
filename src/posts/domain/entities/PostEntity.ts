class PostEntity {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    category: string;
    price: number;
    timestamp: Date;
    userId: string;
  
    constructor(
      id: string,
      title: string,
      description: string,
      imageUrl: string,
      category: string,
      price: number,
      timestamp: Date,
      userId: string
    ) {
      this.id = id;
      this.title = title;
      this.description = description;
      this.imageUrl = imageUrl;
      this.category = category;
      this.price = price;
      this.timestamp = timestamp;
      this.userId = userId;
    }
  }
  
  export default PostEntity;