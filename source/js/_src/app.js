// Import Polyfill
import 'babel-polyfill'

// Write Hitokoto
if (typeof window.$ === 'undefined') {
  throw new Error('JQuery is not loaded!')
}
const write = text => {
  if (text.length < 20) {
    gethitokoto()
  } else {
    document.getElementById('hitokoto').textContent = text
  }
}

// Auto Request Hitokoto
const gethitokoto = () => {
  window.$.ajax({
    url: 'https://api.a632079.me/?encode=json',
    dataType: 'jsonp',
    async: true,
    jsonp: 'callback',
    jsonpCallback: 'moecat',
    success: result => {
      write(result.hitokoto)
    },
    error: () => {
      write('读取一言数据失败了的说……_(:з」∠)_')
    }
  })
}

// Async Load Header Banner

const asyncLoadBanner = () => {
  window.BannerIMG = (typeof window.BannerURL === 'undefined') ? 'https://piccdn.freejishu.com/images/2017/08/22/qerIg.png!/format/jpg' : window.BannerURL
  console.log('[Banner] 发现 Banner ， 加载图片...')
  const ts = Date.now() // Get TS

  // Async Image
  const BannerIMG = new Image()
  BannerIMG.src = window.BannerURL
  BannerIMG.onload = function () {
    // Image Load Done
    document.getElementsByClassName('header-background')[0].style.backgroundImage = ('url(' + window.BannerURL + ')')
    console.log('[Banner] 图片加载完成， 耗时： %s ms', (Date.now() - ts))
  }
}

// Async Load Valine
const asyncLoadValine = config => {
  if (!config) return
  const urls = [`https://cdn1.lncld.net/static/js/3.6.3/av-min.js`, `https://cdn.jsdelivr.net/npm/valine@latest/dist/Valine.min.js`]
  const asyncloader = url =>
    new Promise((resolve, reject) => {
      const script = document.createElement('script')
      script.src = url
      script.addEventListener('load', _ => resolve(), false)
      script.addEventListener('error', _ => reject(_), false)
      document.body.appendChild(script)
    })
  console.log('开始加载 Valine ...')
  const ts = Date.now()
  Promise.all(urls.map(asyncloader))
    .then(_ => {
      document.getElementById('comment-hr').style.display = 'block'
      new window['Valine'](config)
      console.log('Valine 加载完成, 耗时: %s ms', (Date.now() - ts))
    })
    .catch(e => console.error('加载 Valine 失败,', e))
}

// Run Function
gethitokoto()
asyncLoadBanner()
asyncLoadValine(window['ValineConfig'])
