
const TurnBar = document.querySelector('.ply-turn span')
const Turn = document.querySelector('.ply-turn .turn')
const ResetBtn = document.querySelector('.reset')
const Boxs = document.querySelectorAll('.box-grid .box')
const WinnerBar = document.querySelector('.win-bar');
const NextRoundBtn = document.querySelector('.next-round')
const TakesRound = document.querySelector('.takes-round')
const XroundValueBar = document.querySelector('.mth-info .x-ronud .value')
const TiesValueBar = document.querySelector('.mth-info .ties .value')
const OroundValueBar = document.querySelector('.mth-info .o-ronud .value')


let PlayerTurn = 'X'
let StartPlayerTurn
let FindWinner = false
let ResetRound = false
let Xround = 0, Ties = 0, Oround = 0
let Match = ['', '', '','', '', '','', '', '']
let WinningStates = [
	[0,3,6],
	[1,4,7],
	[2,5,8],
	[0,1,2],
	[3,4,5],
	[6,7,8],
	[0,4,8],
	[2,4,6]
]


window.addEventListener('load', ()=>{
	StartPlayerTurn = PlayerTurn
	SetPlayerTurn()
})

ResetBtn.addEventListener('click', RestRoundEvents)
NextRoundBtn.addEventListener('click', RestRoundEvents)

Boxs.forEach((box, index)=>{
	box.addEventListener('click', ()=>{
		if(!FindWinner && box.innerHTML.length === 0){
			ResetRound = true
			Match[index] = PlayerTurn
			box.innerHTML = SetPlayerSymbol(45,14)
			CheckForWinner()
			if(!FindWinner){
				ChangePlayerTurn()
				SetPlayerTurn()	
			}
			
		}
	})	
})


function RestRoundEvents(){
	if(ResetRound){
		WinnerBar.style.display = 'none'
		PlayerTurn = StartPlayerTurn
		Match = Match.map(()=>{return ''})
		Boxs.forEach(box=>{ box.innerHTML = "" })
		TurnBar.innerHTML = 'TURN'
		SetPlayerTurn()
		FindWinner = false	
		ResetRound = false
	}
}



function SetPlayerSymbol(size, dp){
	if(PlayerTurn === 'X'){
		return `<div class="x-ds" style="--size : ${size}px; --dp : ${dp}px; --clr : var(--light-cyan);"></div>`
	}
	else{
		return `<div class="o-ds" style="--size : ${size}px; --dp : ${dp}px; --clr : var(--yellow);"></div>`
	}
}

function CheckForWinner(){
	for(let State of WinningStates){
		if(Match[State[0]] !== '' && Match[State[0]] === Match[State[1]] && Match[State[0]] === Match[State[2]]){
			FindWinner = true
			Turn.className = 'turn'
			TurnBar.innerHTML = 'DONE!'
			if(Match[State[0]] === 'O'){
				TakesRound.style.color = 'var(--yellow)'
				Oround++
				OroundValueBar.innerHTML = Oround
			} 
			else{
				TakesRound.style.color = 'var(--light-cyan)'
				Xround++
				XroundValueBar.innerHTML = Xround
			} 
				
			TakesRound.innerHTML = SetPlayerSymbol(60,17) + `<span>TAKES THE ROUND</span>`;
			WinnerBar.style.display = 'block';
		}
	}
}

function ChangePlayerTurn(){
	PlayerTurn = (PlayerTurn === 'X')? 'O' : 'X';
}

function SetPlayerTurn(){
	if(PlayerTurn === 'X'){
		Turn.classList.add('x-ds')
		Turn.classList.remove('o-ds')
	}
	else {
		Turn.classList.add('o-ds')
		Turn.classList.remove('x-ds')
	}
}

