import orderModel from '../models/Order-model.js'

class order{
    static async listed(params){
        return orderModel.find(params)
    }
    static async single(id){
        return orderModel.findById(id)
    }
   static async update(id, updateData) {
  return orderModel.findByIdAndUpdate(id, updateData, { new: true });
}

    static async delete(params){
        return orderModel.findByIdAndDelete(params)
    }
    static async count(){
        return orderModel.find().countDocuments()
    }
    static async totalSales() {
    const result = await orderModel.aggregate([
        {
            $group: {
                _id: null,
                totalSales: { $sum: "$amount" }  
            }
        }
    ]);

    return result[0]?.totalSales || 0;
}
static async monthlySales() {
  const result = await orderModel.aggregate([
    {
      $group: {
        _id: { 
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" },
          week: { $week: "$createdAt" },
          day: { $dayOfMonth: "$createdAt" }
        },
        totalSales: { $sum: "$amount" },
        count: { $sum: 1 }
      }
    },
    {
      $sort: {
        "_id.year": 1,
        "_id.month": 1,
        "_id.week": 1,
        "_id.day": 1
      }
    },
    {
      $project: {
        year: "$_id.year",
        month: "$_id.month",
        week: "$_id.week",
        day: "$_id.day",
        totalSales: 1,
        count: 1,
        _id: 0
      }
    }
  ]);

  return result;
}
  static async lastMonthSales() {
  const now = new Date();
  const firstDayOfThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const firstDayOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);

  const result = await orderModel.aggregate([
    {
      $match: {
        createdAt: {
          $gte: firstDayOfLastMonth,
          $lt: firstDayOfThisMonth
        }
      }
    },
    {
      $group: {
        _id: null,
        totalSales: { $sum: "$amount" }
      }
    }
  ]);

  return result[0]?.totalSales || 0;
}

  
}

export default order