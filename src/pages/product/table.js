import { ref } from 'vue'
import { formatCurrency } from 'src/utils/format'

const columnsProduct = [
  { name: 'img_url', align: 'left', label: 'Img', field: 'img_url', sortable: true },
  { name: 'name', align: 'left', label: 'Name', field: 'name', sortable: true },
  { name: 'amount', align: 'left', label: 'Amount', field: 'amount', sortable: true },
  { name: 'price', align: 'left', label: 'Price', field: 'price', format: (val) => formatCurrency(val), sortable: true },
  { name: 'actions', align: 'right', label: 'Actions', field: 'actions', sortable: false }
]

const initialPagination = ref({
  page: 1,
  rowsPerPage: 8
})

export {
  columnsProduct,
  initialPagination
}
