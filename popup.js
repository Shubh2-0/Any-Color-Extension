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

    async (result) => {
      let [data] = result

      if (data.result) {
        let color = data.result.sRGBHex

        colorPick.style.backgroundColor = color
        colorValue.innerText = color
        messageBox.innerText = 'color code copy in your clipboard'

        try {
          await navigator.clipboard.writeText(color)
        } catch (error) {
          console.log(error)
        }
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
