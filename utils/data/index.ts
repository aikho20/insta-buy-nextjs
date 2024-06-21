export const DASHBOARD_MENU = [
  {
    title: 'Dashboard',
    route: '/dashboard',
  },
  {
    title: 'Product List',
    route: '/dashboard/products',
  },
]

export const PRODUCT_COLUMNS = [
  { label: 'ID', accessor: '_id' },
  { label: 'Category', accessor: 'category' },
  { label: 'Product Name', accessor: 'productName' },
  { label: 'Images', accessor: 'images' },
  { label: 'Description', accessor: 'description' },
  { label: 'Price', accessor: 'price' },
  { label: 'Quantity', accessor: 'quantity' },
  { label: 'Action', accessor: 'action' },
]
export const ADD_PRODUCT = 'add'
export const REMOVE_PRODUCT = 'remove'
export const UPDATE_PRODUCT = 'update'
