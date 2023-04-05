[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-8d59dc4de5201274e310e4c54b9627a8934c3b88527886e3b421487c677d23eb.svg)](https://classroom.github.com/a/vtMjwcap)
# hw2-handling-input-events
This is the starter code of [2023-Programming User Interface Homework](https://hackmd.io/@akairisu/HkUibgmx3)

r11946013 

簡立誠 (Li-Cheng Chien)

## Deploy URL
[https://curious-rabanadas-00f4ec.netlify.app](https://curious-rabanadas-00f4ec.netlify.app)

## implemented Objects
* mouse-click
* mouse down
* mouse double click
* ESC
* touch click
* touch double click
* touch drag

### mouse-click
滑鼠單擊物件，該物件會變成藍色已表示被選取。 
    
同時只會有一個物件被選取，單擊不同物件會切換選取的物件。

單擊背景會取消選取物件的模式。

### mouse double click
滑鼠雙擊物件，該物件會被選取並進入跟隨模式，物件會跟隨游標移動。

滑鼠再次單擊會取消跟隨模式，物件則不再跟隨游標。

### mouse down
滑鼠在物件上按著不放可以拖曳物件，放開滑鼠則會跟著放開物件。

拖曳物件不會更換選取的物件。

### ESC
在過程中按ESC鍵會還原上一步動作。

* mouse down
  滑鼠按著進行拖曳時按下 ESC，會讓物件回到拖曳前的位置。

* mouse double click
  跟隨模式時按下 ESC，會讓物件回到進入跟隨模式前的位置。

### touch click
手指單擊效果會跟滑鼠單擊效果一致，單觸物件會選取物件、單觸背景會取消選取。

同時只會有一個物件被選取，單觸不同物件會切換選取的物件。

### touch double click
手指雙觸物件會選取該物件並進入跟隨模式。

此時手指離開螢幕不會離開跟隨模式，再次單指觸擊物件會跟隨手指並可拖曳。

再次手指單擊螢幕才會離開跟隨模式。

### touch drag
手指持續觸擊物件可以拖曳物件，結束觸擊則會跟著放開物件。

拖曳物件不會更換選取的物件。