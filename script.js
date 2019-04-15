

setInterval(()=>{
  let details = document.getElementsByTagName("app-handshake-detail")
  if (details.length < 1) {
    return
  }
  const total = {}
  details = Array.from(details)
  details.forEach((detail)=>{
    const items = detail.getElementsByTagName("mat-list-item")

    const header = items[0]
    const p = header.getElementsByTagName("p")
    const status = p[0].textContent
    const created = p[1].textContent

    if (status != "ステータス: 処理済み") {
      return
    }

    for(let i=1; i < items.length; i++) {
      const item = items[i]
      const h4 = item.getElementsByTagName("h4")
      const title = h4[0].textContent

      if (!total[title]) {
        total[title] = {count: 0, sales: 0}
      }

      const p = item.getElementsByTagName("p")
      const result = p[0].textContent

      const regex = /([0-9]+)[^0-9]+([0-9]+)/;
      const receipt = result.match(regex);
  
      const count = parseInt(receipt[1])
      const price = parseInt(receipt[2])
      total[title].count += count
      total[title].sales += count * price
    }
  })

  const report = Object.keys(total).map((key) => {
    return key +"："+ total[key].count + "冊 " + total[key].sales + "円"
  }).join(", ")
  const h3 = document.getElementsByTagName("h3")
  h3[0].textContent = "頒布物支払い状況（" + report + ")"
}, 2000)



