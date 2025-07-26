import orderService from '../services/orderService.js'
import userService from '../services/userService.js'
import productService from '../services/productService.js'

class DashboardController {
  static async dashboardCount(req, res) {
    try {
      const orderCount = await orderService.count();
      const userCount = await userService.count();
      const productCount = await productService.count();
      const totalSales = await orderService.totalSales();
      const monthlySales = await orderService.monthlySales();
      const lastMonthSales = await orderService.lastMonthSales();
      // res.json({ success: true, data: { totalSales, lastMonthSales} });
          // res.json({ success: true, data: monthlySales });

      console.log({ orderCount, userCount, productCount, totalSales,monthlySales,lastMonthSales });

      if ([orderCount, userCount, productCount, totalSales,monthlySales].some(val => val === undefined || val === null)) {
        return res.status(404).json({
          success: false,
          message: "Count not found"
        });
      }

      res.status(200).json({
        success: true,
        message: "Counts fetched successfully",
        data: {
          orders: orderCount,
          products: productCount,
          users: userCount,
          totalSales: totalSales,
          monthlySales:monthlySales,
          lastMonthSales:lastMonthSales
        }
      });

    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }
}

export default DashboardController;
