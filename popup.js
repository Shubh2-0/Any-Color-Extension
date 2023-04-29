let btn = document.querySelector('.colorbtn')
let colorPick = document.querySelector('.colorGrid')
let colorValue = document.querySelector('.colorValue')
let messageBox = document.querySelector('.message')

btn.addEventListener('click', async () => {
  let [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  })

  chrome.scripting.executeScript(
    {
      target: { tabId: tab.id },

      function: pickColor,
    },
    async (injectionResults) => {
      let [data] = injectionResults

      console.log(injectionResults)

      if (data.result) {
        let color = data.result.sRGBHex

        colorPick.style.backgroundColor = color
        messageBox.innerText = 'color code copy in your clipboard'

        try {
          await navigator.clipboard.writeText(color)
        } catch (error) {
          color.log(error)
        }

        colorValue.innerText = color
      }
    },
  )
})

async function pickColor() {
  try {
    let eyeDroper = new EyeDropper()

    return await eyeDroper.open()
  } catch (error) {
    console.log(error)
  }
}
