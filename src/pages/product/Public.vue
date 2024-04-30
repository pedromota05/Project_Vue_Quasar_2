<template>
  <q-header elevated>
    <q-toolbar class="row no-wrap items-center" style="height: 72px; padding-left: 16px;">
        <q-img class="doc-header__logo-img" src="~assets/logo-dark.svg" alt="Quasar Logo" style="width: 48px; height: 48px;" />
        <q-toolbar-title style="color: #fff; font-weight: 500; letter-spacing: 1px;" v-if="isDesktop && brand.name">
            {{ brand.name }}
        </q-toolbar-title>
        <q-space />
        <q-input rounded outlined dense bg-color="white" debounce="300" v-model="filter" placeholder="Search" class="col-8 input-search" v-if="isMobile">
            <template v-slot:append>
                <q-icon name="mdi-magnify"></q-icon>
            </template>
        </q-input>
    </q-toolbar>
  </q-header>
  <q-page style="padding: 30px">
    <div class="q-pa-md" style="padding: 0; margin-bottom: 30px;">
        <q-carousel
	animated
	swipeable
	v-model="slide"
	arrows
	navigation
	infinite
	control-color="grey"
	:autoplay="4000"
	@mouseenter="autoplay = false"
	@mouseleave="autoplay = true"
	style="height: 420px !important;"
	v-if="isDesktop"
	>
            <img :name="1" src="https://img.freepik.com/psd-gratuitas/banner-de-midia-social-instagram-sexta-feira-negra-para-ofertas-imperdiveis_220664-3543.jpg?t=st=1714484880~exp=1714488480~hmac=5fd0083ff64459788663b2416b9dc5d75039ba2930baceda52dcda41a8b1f2d0&w=1380" style="background-position: center; background-repeat: no-repeat; width: 100%; height: 100%; position: absolute;" />
            <img :name="2" src="https://img.freepik.com/psd-premium/banner-de-modelo-de-midia-social-sexta-feira-negra-chegou-com-otimas-ofertas_318354-894.jpg?w=1380" style="background-position: center; background-repeat: no-repeat; width: 100%; height: 100%; position: absolute;" />
            <img :name="3" src="https://img.freepik.com/vetores-gratis/banner-grunge-de-venda-larga-laranja-preta-sexta-feira_1017-34783.jpg?t=st=1714484823~exp=1714488423~hmac=2fa6f3b32ff267993c7e69dbaeec7fd034e79980410c4c0ac431d2620547c34e&w=1380" style="background-position: center; background-repeat: no-repeat; width: 100%; height: 100%; position: absolute;" />
        </q-carousel>
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
            height="220px"
            v-if="isMobile"
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
        <q-select outlined v-model="categoryId" :options="optionsCategories" label="Category" option-label="name" option-value="id" map-options emit-value clearable class="col-12" dense @update:model-value="handleListProducts(route.params.id)" />
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
            <transition-group
                appear
                enter-active-class="animated fadeInLeft"
                leave-active-class="animated fadeOutRight"
            >
            <div class="q-pa-xs col-xs-12 col-sm-6 col-md-3" key="card">
                <q-card class="my-card cursor-pointer" flat bordered v-ripple:primary @click="handleShowDetails(props.row)" >
                    <q-img :src="props.row.img_url" :ratio="4/3" fit="contain" style="object-position: 50% 50%;"/>

                    <q-card-section>
                        <q-btn
                        fab
                        color="primary"
                        icon="mdi-heart-outline"
                        class="absolute"
                        style="top: 0; right: 12px; transform: translateY(-50%);"
                        />

                        <div class="row no-wrap items-center">
                        <div class="col text-h6 ellipsis">
                            {{ props.row.name }}
                        </div>
                        </div>

                        <q-rating v-model="stars" :max="5" size="32px" />
                    </q-card-section>

                    <q-card-section class="q-pt-none">
                        <div class="text-subtitle1" style="font-weight: 600">
                            {{ formatCurrency(props.row.price) }}
                        </div>
                        <div class="text-caption text-grey">
                            {{ props.row.description }}
                        </div>
                    </q-card-section>
                </q-card>
            </div>
            <div class="col-12" v-if="props.rowIndex === 3 && brand.paralax_url" key="paralax" style="margin: 15px 0">
              <q-parallax :height="150" :speed="0.5">
                <template v-slot:media>
                  <img :src="brand.paralax_url">
                </template>
                <template v-slot:content="scope">
                    <div
                        class="absolute column items-center"
                        :style="{
                            opacity: 0.75 + (1 - scope.percentScrolled) * 0.55,
                            left: 0,
                            right: 0,
                            color: '#ffffff'
                        }"
                    >
                        <h3 class="text-white">{{ brand.name }}</h3>
                    </div>
                </template>
              </q-parallax>
            </div>
        </transition-group>
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
      stars: ref(4),
      pagesNumber: computed(() => Math.ceil(products.value.length / initialPagination.value.rowsPerPage))
    }
  }
})
</script>

<style scoped>
.input-search:focus,
.input-search:hover {
    outline: none;
    color: transparent;
}
</style>
