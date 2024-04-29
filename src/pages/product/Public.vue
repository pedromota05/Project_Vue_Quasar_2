<template>
  <q-header elevated>
    <a href="/" style="text-decoration: none">
      <q-toolbar class="row no-wrap items-center" style="height: 72px; padding-left: 16px;">
	<q-img class="doc-header__logo-img" src="~assets/logo-dark.svg" alt="Quasar Logo" style="width: 48px; height: 48px;" />
	<q-toolbar-title style="color: #fff; font-weight: 500; letter-spacing: 1px;" v-if="isDesktop">
		{{ brand.name }}
	</q-toolbar-title>
	<q-input rounded outlined dense debounce="300" v-model="filter" placeholder="Search" class="q-mr-sm col-11" style="margin: 20px 0" v-if="isMobile">
	  <template v-slot:append>
	    <q-icon name="mdi-magnify"></q-icon>
	  </template>
	</q-input>
      </q-toolbar>
    </a>
  </q-header>
  <q-page style="padding: 30px">
    <!-- <div class="row" v-if="brand.name">
        <div class="col-12 text-center text-h4" style="font-weight: 700; line-height: 1.5">
            {{ brand.name }}
        </div>
    </div> -->
    <div class="q-pa-md" style="padding: 10px; margin-bottom: 35px;">
        <q-carousel
            animated
            swipeable
            v-model="slide"
            arrows
            navigation
            infinite
            :autoplay="autoplay"
            @mouseenter="autoplay = false"
            @mouseleave="autoplay = true"
        >
            <img :name="1" src="https://img.freepik.com/psd-premium/banner-de-midia-social-semana-do-consumidor-com-40-de-desconto_318354-384.jpg?w=826" style="background-position: center; background-repeat: no-repeat; width: 100%; height: 100%; position: absolute;" />
            <img :name="2" src="https://img.freepik.com/vetores-premium/modelo-de-banner-de-vetor-de-venda-oferta-limitada_348082-926.jpg?w=826" style="background-position: center; background-repeat: no-repeat; width: 100%; height: 100%; position: absolute;" />
            <img :name="3" src="https://img.freepik.com/vetores-premium/modelo-de-banner-de-vetor-de-venda-oferta-limitada_348082-1283.jpg?w=826" style="background-position: center; background-repeat: no-repeat; width: 100%; height: 100%; position: absolute;" />
        </q-carousel>
    </div>
    <div class="row q-flex" style="margin: 15px 0" v-if="isDesktop">
        <div class="col-3">
            <q-select
            outlined
            v-model="categoryId"
            :options="optionsCategories"
            label="Category"
            option-label="name"
            option-value="id"
            map-options
            emit-value
            clearable
            dense
            @update:model-value="handleListProducts(route.params.id)"
            />
        </div>
        <q-space/>
        <div class="col-3 q-flex q-flex-column">
            <q-space /> <q-input rounded outlined dense debounce="300" v-model="filter" placeholder="Search">
            <template v-slot:append>
                <q-icon name="mdi-magnify"></q-icon>
            </template>
            </q-input>
        </div>
    </div>
    <div class="row justify-center items-center" style="display: flex; flex-direction: column; margin: 15px 0" v-if="isMobile">
        <q-input rounded outlined dense debounce="300" v-model="filter" placeholder="Search" class="q-mr-sm col-11" style="margin: 20px 0">
            <template v-slot:append>
                <q-icon name="mdi-magnify"></q-icon>
            </template>
        </q-input>
	<q-space/>
        <q-select outlined v-model="categoryId" :options="optionsCategories" label="Category" option-label="name" option-value="id" map-options emit-value clearable class="col-11" dense @update:model-value="handleListProducts(route.params.id)" />
    </div>
    <hr color="#dcdcdc" style="margin: 25px 0; height: 0.1px" />
    <p style="color: #707070; font-size: 14px; text-align: left; font-weight: 600; line-height: 130%;">{{ productCount }} produtos</p>
    <div class="row">
      <q-table
        :rows="products"
        :columns="columnsProduct"
        v-model:pagination="initialPagination"
        row-key="id"
        class="col-12"
        :loading="loading"
        :filter="filter"
        grid
        hide-pagination
      >
        <template v-slot:item="props">
            <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4">
                <q-card class="cursor-pointer" v-ripple:primary @click="handleShowDetails(props.row)" style="height: 500px; box-shadow: .5rem .5rem 1rem rgba(0, 0, 0, .15) !important;" v-if="isDesktop">
                    <div class="text-center" style="height: 80%;">
                        <q-img :src="props.row.img_url" class="standard-image" style="width: 80%; margin: 40px auto;" />
                    </div>
                    <q-card-section class="text-center">
                        <div class="text-h6">{{ props.row.name }}</div>
                        <div class="text-subtitle1" style="font-weight: 500">{{ formatCurrency(props.row.price) }}</div>
                    </q-card-section>
                </q-card>
                <q-card class="cursor-pointer" v-ripple:primary @click="handleShowDetails(props.row)" style="height: 420px; margin-top: 15px; box-shadow: 0 .5rem 1rem rgba(0, 0, 0, .15) !important;" v-if="isMobile">
                    <div class="text-center" style="height: 70%;">
                        <q-img :src="props.row.img_url" class="standard-image" style="width: 80%; margin: 40px auto;" />
                    </div>
                    <q-card-section class="text-center">
                        <div class="text-h6">{{ props.row.name }}</div>
                        <div class="text-subtitle1" style="font-weight: 500">{{ formatCurrency(props.row.price) }}</div>
                    </q-card-section>
                </q-card>
            </div>
      </template>
      </q-table>
    </div>
    <div class="row justify-center" style="margin: 30px 0">
        <q-pagination
          v-model="initialPagination.page"
          :max="pagesNumber"
          direction-links
          @update:model-value="handleScrollToTop"
        />
    </div>
    <dialog-product-details
      :show="showDialogDetails"
      :product="productDetails"
      @hide-dialog="showDialogDetails = false"
    />
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted, computed } from 'vue'
import useApi from 'src/composables/UseApi'
import useNotify from 'src/composables/UseNotify'
import { useRoute } from 'vue-router'
import { columnsProduct, initialPagination } from './table'
import { formatCurrency } from 'src/utils/format'
import { useQuasar } from 'quasar'
import DialogProductDetails from 'src/components/DialogProductDetails.vue'

export default defineComponent({
  name: 'PageProductPublic',
  components: {
    DialogProductDetails
  },
  computed: {
    productCount () {
      return this.products.length
    }
  },

  setup () {
    const products = ref([])
    const loading = ref(true)
    const filter = ref('')
    const table = 'product'
    const showDialogDetails = ref(false)
    const productDetails = ref({})
    const optionsCategories = ref([])
    const categoryId = ref('')
    const $q = useQuasar()

    const { listPublic, brand } = useApi()
    const { notifyError } = useNotify()
    const route = useRoute()

    const handleListProducts = async (userId) => {
      try {
        loading.value = true
        products.value = categoryId.value ? await listPublic(table, userId, 'category_id', categoryId.value) : await listPublic(table, userId)
        loading.value = false
      } catch (error) {
        notifyError(error.message)
      }
    }

    const handleShowDetails = (product) => {
      productDetails.value = product
      showDialogDetails.value = true
    }

    const handleListCategories = async (userId) => {
      optionsCategories.value = await listPublic('category', userId)
    }

    const handleScrollToTop = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const isDesktop = computed(() => $q?.platform?.is?.desktop)
    const isMobile = computed(() => $q?.platform?.is?.mobile)

    onMounted(() => {
      if (route.params.id) {
        handleListCategories(route.params.id)
        handleListProducts(route.params.id)
      }
    })

    return {
      columnsProduct,
      products,
      handleListProducts,
      loading,
      formatCurrency,
      filter,
      showDialogDetails,
      productDetails,
      handleShowDetails,
      brand,
      optionsCategories,
      categoryId,
      route,
      initialPagination,
      handleScrollToTop,
      isDesktop,
      isMobile,
      slide: ref(1),
      autoplay: ref(true),
      pagesNumber: computed(() => Math.ceil(products.value.length / initialPagination.value.rowsPerPage))
    }
  }
})
</script>

<style scoped>
.standard-image {
    object-fit: cover;
}
</style>
