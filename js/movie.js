function searchMovie(){
    $('#movie-list').html('')
    $.ajax({
        url: 'http://omdbapi.com',
        type: 'get',
        dataType : 'json',
        data: {
            'apikey': 'a2b8d765',
            's' : $('#search-input').val()
        },
        success : function(result){
           
            if(result.Response == 'True'){
                let movies = result.Search;
                    console.log(movies);
                $.each(movies, function(i,data){
                    $('#movie-list').append(`
                       <div class="col-md-4">
                            <div class="card">
                                <img class="card-img-top" src="`+data.Poster+`" alt="Card image cap">
                                <div class="card-body">
                                    <h5 class="card-title">`+data.Title+`</h5>
                                    <p class="card-text">Tahun `+data.Year+`</p>
                                    <a href="#" class="card-link see-detail" data-toggle="modal" data-target="#exampleModal" data-id="`+data.imdbID+`">See Detail</a>
                                </div>
                            </div> 
                       </div>
                    `);
                });
                $('#search-input').val('');
            }else{
                $('#movie-list').html(`
                 <div class="col">
                     <h1 class="text-center">`+ result.Error+ `</h1>
                 </div>
                `);
            }
        }
    })
}
// ketika button di klik
$('#search-button').on('click', function(){
    searchMovie();
});
// ketika input dienter
$('#search-input').on('keyup',function(event){
    if(event.keyCode === 13){
        searchMovie();
    }
})
$('.see-detail').on('click', '.see-detail',function(){
    // console.log($(this).data('id'));
    $.ajax({
        url: 'http://omdbapi.com',
        type: 'get',
        dataType : 'json',
        data: {
            'apikey': 'a2b8d765',
            'i' : $(this).data('id')
        },
        sucsess: function(movie){
            if(movie.Response === "True"){
                $('#modal-body').html(`
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-md-4">
                            <img src="`+movie.Poster+`" alt="" class="img-fluid">
                        </div>
                        <div class="col-md-5">
                            <ul class="list-group">
                                <li class="list-group-item"><h3>`+movie.Title+`</h3></li>
                                <li class="list-group-item">Release :`+movie.Released+`</li>
                                <li class="list-group-item">Genre :`+movie.Genre+`</li>
                                <li class="list-group-item">Director :`+movie.Director+`</li>
                                <li class="list-group-item">Actors :`+movie.Actors+`</li>
                            </ul>
                        </div>
                    </div>
                </div>
                
                `)
            }
        }
    })
})
