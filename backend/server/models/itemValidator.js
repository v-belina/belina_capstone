const z = require("zod");

//validates when new item is being created
const newItemValidation = (data) => {
  const createValidationSchema = z.object({
    //   itemId: z.string().min(6,'Id must be 6 characters or more'),
    //   itemName : z.string().min(6, 'Item must be 6 characters or more'),
    //  itemPrice: z.string().min(6,'Please Input a valid number'),
    id: z.string().min(1).max(50),
    name: z.string().min(1).max(50),
    price: z.number().min(0),
  });

  return createValidationSchema.safeParse(data);
};

module.exports.newItemValidation = newItemValidation;
