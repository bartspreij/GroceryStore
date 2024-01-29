# GroceryStore App

## Overview
The Supermarket App is designed to cater to different categories of users, typically customers and managers. Normally, separate apps would be developed for each main user category. However, in this instance, while the database and possibly the backend may be shared, the functionalities for customers and managers are integrated into a single application. The managers' section can be viewed as a more straightforward way to update the database, but it can also be expanded for more comprehensive management tasks.

## Basic Requirements

### Opening Screen
1. **List of Offers**: Users are greeted with a list of current offers and promotions on the opening screen.

### Frequent Purchases Screen
2. **Frequent Products**: This screen displays products that the user frequently purchases. 
   - **Authentication**: Users need to enter their username and password on this screen to view their personalized list.
   - **Pre-filled Quantities**: The products are listed with the quantities in which they are most commonly bought (e.g., 1x, 2x, 3x, etc.).
   
### Product Features
3. **Product Information**: Each product in the app has the following attributes:
   - **Price**: The cost of the product.
   - **Description**: A brief description of the product.
   - **Categories/Tags**: Products are classified into one or more categories or tags, such as vegetables, fruits, household items, "zero-calories", "rich in calcium", etc.

### Shopping Cart
4. **Adding Products to Cart**:
   - Users can add products to their shopping cart, including adding the same product multiple times.
   - **Cart Visibility**: The app clearly displays the number of items in the cart.
   - **Easy Removal**: Users have the option to remove items from the cart if they have added too many.

### Cart Management and Checkout
5. **Managing the Shopping Cart**:
   - Users can view their shopping cart, add more products to it, or remove products.
   - **Checkout Process**: The shopping cart can be checked out, meaning users can complete their purchases. The cart is emptied after the checkout process.

### Product Search
6. **Search Functionality**:
   - Users should be able to find products using various methods, such as by name, category, or other search options.

### Management Application Features
7. **Product Management for Managers**:
   - Managers have the ability to add and delete products, along with their descriptions and prices.

8. **Price Modification**:
   - Managers are empowered to change the prices of products as needed.
   
## Extra Challenges

### A. Product Images
   - **Photo Integration**: Ensure that items in the app can be accompanied by photos, enhancing the visual appeal and information quality.

### B. Manager Specials
   - **Promotional Offers**: Allow the manager to set special offers on products. These could be price reductions valid for a specific period, typically until the end of the week.

### C. Sales Overview for Managers
   - **Sales Reports**: The manager should have access to a report showing the quantity of each product sold over a given period, such as the past week or month.

### D. Sorting 'My List'
   - **Order of Products in 'My List'**: The products in a user's frequent purchase list ('My List') should be organized so that the most recently purchased items are at the top.

### E. User Customization
   - **Category Sorting**: Users should have the option to sort their list by categories like vegetables, fruits, household items, etc., instead of the default 'most recently bought' sorting.
   - **Easy Navigation**: Include a feature that allows users to quickly navigate to the desired category. Within categories, consider sorting products either by the most recently bought or alphabetically.
   
### F. Delivery Scheduling and Confirmation
   - **Scheduling Delivery**: Provide customers with the option to select a specific day and time slot for their delivery. This feature enhances convenience by allowing customers to choose a delivery schedule that suits them.
   - **Email Confirmation**: Optionally, an email confirmation of the scheduled delivery can be sent to the customer for their reference and assurance.




