$(function(){

    // сохраняем необходимые элементы DOM дерева в переменные для удобства

    var refreshButton = $('h1 img'),
        shoutboxForm = $('.shoutbox-form'),
        form = shoutboxForm.find('form'),
        closeForm = shoutboxForm.find('h2 span'),
        nameElement = form.find('#shoutbox-name'),
        commentElement = form.find('#shoutbox-comment'),
        ul = $('ul.shoutbox-content');


    // Конвертируем все напечатанные смайлы в смайлы emoji
    emojione.ascii = true;

    // загрузка сообщений
    load();
    
    // Публикуем сообщение, если все поля заполнены
    
    var canPostComment = true;

    form.submit(function(e){
        e.preventDefault();

        if(!canPostComment) return;
        
        var name = nameElement.val().trim();
        var comment = commentElement.val().trim();

        if(name.length && comment.length && comment.length < 240) {
        
            publish(name, comment);

            canPostComment = false;

            // новый комментарий может быть опубликованым через 5 секунд

            setTimeout(function(){
                canPostComment = true;
            }, 5000);

        }

    });
    
    // Переключение видимости формы
    
    shoutboxForm.on('click', 'h2', function(e){
        
        if(form.is(':visible')) {
            formClose();
        }
        else {
            formOpen();
        }
        
    });
    
    // событие клика, читает параметра data где находится имя и вставляет его в поле ввода сообщения
    
    ul.on('click', '.shoutbox-comment-reply', function(e){
        
        var replyName = $(this).data('name');
        
        formOpen();
        commentElement.val('@'+replyName+' ').focus();

    });
    
    // обновление с помощью функции load()
    
    var canReload = true;

    refreshButton.click(function(){

        if(!canReload) return false;
        
        load();
        canReload = false;

        // следующая перезагрузка через 2 секунды

        setTimeout(function(){
            canReload = true;
        }, 2000);
    });

    // Обновление сообщений каждые 20 секунд

    setInterval(load,20000);


    function formOpen(){
        
        if(form.is(':visible')) return;

        form.slideDown();
        closeForm.fadeIn();
    }

    function formClose(){

        if(!form.is(':visible')) return;

        form.slideUp();
        closeForm.fadeOut();
    }

    // сохранение сообщений в хранилище
    
    function publish(name,comment){
    
        $.post('publish.php', {name: name, comment: comment}, function(){
            nameElement.val("");
            commentElement.val("");
            load();
        });
    }
    
    // Получение последних сообщений
    
    function load(){
        $.getJSON('./load.php', function(data) {
            appendComments(data);
        });
    }
    
    // вывод массива сообщений в HTML
    
    function appendComments(data) {

        ul.empty();

        data.forEach(function(d){
            ul.append('<li>'+
                '<span class="shoutbox-username">' + d.name + '</span>'+
                '<p class="shoutbox-comment">' + emojione.toImage(d.text) + '</p>'+
                '<div class="shoutbox-comment-details"><span class="shoutbox-comment-reply" data-name="' + d.name + '">Ответить</span>'+
                '<span class="shoutbox-comment-ago">' + d.timeAgo + '</span></div>'+
            '</li>');
        });
    }

});