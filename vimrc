set t_Co=256

syntax on
" habilito el esquema de colores
colorscheme minimalist
"colorscheme gruvbox
"colorscheme thinkpad
" seteo el numero de lineas
set nu
" cuando hay texto las lineas son transparentes
"hi! Normal ctermbg=NONE guibg=NONE
" descrimino el tipo de arcivo
filetype plugin indent on
" seteo statusline
set statusline=\ %f\ %y\ %m%=%l,%c\ \ \ \ \ \ \ \ \ \ \ \ %P\ |

set background=dark

" colores para espacios
highlight NonText guifg=#4a4a59
highlight SpecialKey guifg=#4a4a59

" ver los tabs
set list
set listchars=tab:--

"ver directorios
autocmd StdinReadPre * let s:std_in=1
autocmd VimEnter * if argc() == 0 && !exists("s:std_in") | NERDTree | endif
map <C-n> :NERDTreeToggle<CR>
