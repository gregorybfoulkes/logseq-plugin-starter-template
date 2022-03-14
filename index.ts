import '@logseq/libs';
import { SettingSchemaDesc } from '@logseq/libs/dist/LSPlugin.user';

// const settings = [{preferred}]
let settings: SettingSchemaDesc[] = [{ key: "CommaSeparatedOptions", type: "string", title: "Options in workflow", description: "Enter your desired workflow options, separated by commas. i.e. 'TODO, DOING, WAITING, CANCELLED'", default: "TODO, DONE, CANCELLED, WAITING" }, { key: "Keyboard-Shortcut", type: "string", title: "keyboard shortcut", description: "Choose your desired keyboard shortcut to toggle the changes", default: "mod+shift+enter" }]
  logseq.useSettingsSchema(settings)
const main = async () => {
  console.log('plugin loade2d');
  console.log(logseq.settings['Keyboard-Shortcut'])
  
  logseq.App.registerCommandPalette({
    key: 'Toggle-Workflow-State',
    label: 'Toggle Workflow State',
    keybinding: {
      binding: (await logseq.settings['Keyboard-Shortcut'])
    }
  }, async () => {
    let block = await logseq.Editor.getCurrentBlock()
    if (block != undefined) {
      let blockFirstWord = block.content.split(' ')[0].split('\n')[0]
      console.log("blockFirstWord", blockFirstWord)
      block
      let SeparatedArray = logseq.settings.CommaSeparatedOptions
      let commaSeparatedArray = SeparatedArray.split(", ")
      console.log(commaSeparatedArray)
      let insertionTracker = false
      for (const x in commaSeparatedArray) {


        if (commaSeparatedArray[x] == (blockFirstWord)) {
          console.log(blockFirstWord)
          console.log(commaSeparatedArray[x])
          let index = commaSeparatedArray.indexOf(commaSeparatedArray[x])
          console.log(`The valeu i ${commaSeparatedArray[index + 1]}`)
          console.log("YAY")
          let finalText;
          if (commaSeparatedArray[index + 1] == undefined) {
            finalText = " "
            insertionTracker = true
          }
          else {
            finalText = commaSeparatedArray[index + 1]
            insertionTracker = true
          }
          logseq.Editor.updateBlock(block.uuid, finalText)
          break
        }
      }
      if (insertionTracker == false) {
        logseq.Editor.updateBlock(block.uuid, commaSeparatedArray[0])
      }
    }
    else {
      logseq.App.showMsg("Error: You can't toggle state outside of a block")
    }
  });
}
logseq.ready(main).catch(console.error);