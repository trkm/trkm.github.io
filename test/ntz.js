function out(s){
    document.getElementById('out').innerHTML = s
}

function navLine(){
    return '<div>nav</div>'
}

function esc(str){
  var result = str.trim()
  result = result.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")
  if(result.length == 0){
    result = "???"
  }
  return result
}

function showBooks(){
    var list = listBooks()
    var html = navLine()
    for(i = 0; i < list.length; i++){
        var name = list[i]
        html += '<div class="item" draggable="true" ondragover="dragover(event)"'
        html += ' id="' + i + '"'
        html += ' onclick="return showBook(' + i + ')"'
        html += ' ondragenter="dragenter(event)"'
        html += ' ondragleave="dragexit(event)"'
        html += ' onDrop="onDrop(event)"'
        html += ' onDragStart="dragstart(event, '+ i + ')">'
        html += esc(list[i])
        html += '</div>'
  }
  html += '<div class="item" onClick="return addBook()">+</div>'
  notes_list = undefined
  out(html)
  onEsc = function(){}
  return false
}

function getNoteTitle(note){
  var title = note.split('\n')[0].trim()
  title = title.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")
  if(title.length == 0){
    title = "???"
  }
  return title
}

function showBook(i){
    var books = listBooks()
    if(!books || i >= books.length){
        showBooks()
        return
    }
    var name = books[i]
    var psw = ''
    var list = loadBook(name, psw)
    var html = navLine()
    for(j = 0; j < list.length; j++){
        html += '<div class="item" draggable="true" ondragover="dragover(event)"'
        html += ' id="' + j + '"'
        html += ' onclick="return showNote(' + i + ', ' + j + ')"'
        html += ' ondragenter="dragenter(event)"'
        html += ' ondragleave="dragexit(event)"'
        html += ' onDrop="onDrop(event)"'
        html += ' onDragStart="dragstart(event, '+ j + ')">'
        html += getNoteTitle(list[j])
        html += '</div>'
  }
  html += '<div class="item" onClick="return addNote()">+</div>'
  notes_list = undefined
  out(html)
  onEsc = function(){}
  return false   
}

function ymdhms(uts){
    return uts
}

function showNote(book_ix, note_ix){
    var books = listBooks()
    if(!books || book_ix >= books.length){
        showBooks()
        return
    }
    var name = books[book_ix]
    var psw = ''
    var list = loadBook(name, psw)
    if(!list || note_ix >= list.length){
        showBook(book_ix)
        return
    }
    var txt = list[note_ix]
    var html = navLine()
    var mod = 'YMD'
    html += ''
    txt = txt.trim().replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").split('\n')
    if(txt[0].trim().length == 0){
        txt[0] = '???'
    }
    txt[0] = '<b onClick="return editNote(' + book_ix + ', ' + note_ix + ')">' + txt[0] + '</b>' + '<span class="modified">' + ymdhms(mod) + '</span>'
    txt = 
    html += '<div>' + txt.join('<br>') + '</div>'
    out(html)
    onEsc = function(){showBook(book_ix)}
    return false 
}

prev_visible_id = 'splash'

function showCard(id){
    document.getElementById(prev_visible_id).style.visibility = 'hidden'
    document.getElementById(id).style.visibility = 'visible'
    prev_visible_id = id
}

function setValue(id, value){
    document.getElementById(id).value = value
}

function setText(id, value){
    document.getElementById(id).innerText = value
}

function getValue(id){
    return document.getElementById(id).value
}

function onEnter(e, cb){
    if(e.keyCode == 13){
        cb();
    }
}

function onToken(){
    setText('token-view-txt', getValue('token'))
    showCard('token-view')
}

function onTokenView(){
    showCard('token-form')
}

function init(){
    //showBooks()
    showCard('token-form')
    document.title = 'ntz2 1'
}
