### **Step 1: Database Integration (PostgreSQL & MongoDB) in Nx Monorepo**  

We'll set up **PostgreSQL (structured data) & MongoDB (flexible attributes)** using a shared database library in Nx.

---

## **1. Setting Up PostgreSQL with Prisma**
### **1.1. Install Prisma & PostgreSQL Client**
Run the following command inside your monorepo:  
```sh
npm install @prisma/client
npx prisma init --schema=libs/database/prisma/schema.prisma
```

---

### **1.2. Define PostgreSQL Schema (`libs/database/prisma/schema.prisma`)**
```prisma
generator client {
  provider = "prisma-client-js"
  output   = "../../node_modules/.prisma/client"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Business {
  id       String  @id @default(uuid())
  name     String
  config   Json
  products Product[]
}

model Product {
  id          String  @id @default(uuid())
  business_id String
  name        String
  category    String
  base_price  Float
  created_at  DateTime @default(now())
  updated_at  DateTime @updatedAt

  Business Business @relation(fields: [business_id], references: [id])
}
```

---

### **1.3. Generate Prisma Client**
Run:
```sh
npx prisma generate
npx prisma migrate dev --name init
```
This will apply migrations and create tables.

---

## **2. Setting Up MongoDB with Mongoose**
### **2.1. Install Mongoose**
```sh
npm install @nestjs/mongoose mongoose
```

---

### **2.2. Create Mongoose Schema (`libs/database/src/mongo/product-attributes.schema.ts`)**
```ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class ProductAttributes extends Document {
  @Prop({ required: true })
  business_id: string;

  @Prop({ required: true })
  product_id: string;

  @Prop({ type: Object })
  custom_fields: Record<string, any>;
}

export const ProductAttributesSchema = SchemaFactory.createForClass(ProductAttributes);
```

---

## **3. Create a Shared Database Module (`libs/database/src/database.module.ts`)**
This module provides both PostgreSQL (Prisma) and MongoDB (Mongoose) connections.

```ts
import { Module } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductAttributes, ProductAttributesSchema } from './mongo/product-attributes.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: ProductAttributes.name, schema: ProductAttributesSchema }]),
  ],
  providers: [
    {
      provide: 'PRISMA_CLIENT',
      useClass: PrismaClient,
    },
  ],
  exports: ['PRISMA_CLIENT', MongooseModule],
})
export class DatabaseModule {}
```

---

## **4. Use Database Module in a Service (Example: Inventory Service)**
### **4.1. Inject Prisma & Mongoose in Inventory Service**
Modify `apps/inventory-service/src/inventory.service.ts`:

```ts
import { Injectable, Inject } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductAttributes } from '@repo/database';

@Injectable()
export class InventoryService {
  constructor(
    @Inject('PRISMA_CLIENT') private prisma: PrismaClient,
    @InjectModel(ProductAttributes.name) private productAttributesModel: Model<ProductAttributes>,
  ) {}

  async createProduct(data) {
    const product = await this.prisma.product.create({
      data: {
        business_id: data.business_id,
        name: data.name,
        category: data.category,
        base_price: data.base_price,
      },
    });

    if (data.custom_fields) {
      await this.productAttributesModel.create({
        business_id: data.business_id,
        product_id: product.id,
        custom_fields: data.custom_fields,
      });
    }

    return product;
  }
}
```

---

### **Next Steps**
1. **Test database connection with CRUD operations.**  
2. **Set up Redis caching for stock levels.**  
3. **Move on to API Gateway implementation.**  

Would you like to start **testing CRUD operations next**, or should we set up **Redis caching first**?