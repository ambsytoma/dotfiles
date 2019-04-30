#!/bin/bash
  
#echo $(clear)
echo -e '\e[01;30m ▚ \e[0;32m ▞ \e[01;31m ▚ \e[0;31m ▞ \e[01;32m ▚ \e[0;32m ▞ \e[01;33m ▚ \e[0;33m ▞ \e[01;34m ▚ \e[0;34m ▞ \e[01;35m ▚ \e[0;35m ▞ \e[01;36m ▚ \e[0;36m ▞ \e[01;37m ▚ \e[0;37m ▞ \e[01;30m ▚ \e[0;32m ▞ \e[01;31m ▚ \e[0;31m ▞ \e[01;33m ▚ \e[0;33m ▞ \e[01;32m ▚ \e[0;32m ▞ '


PS1="\n\[\e[0;31m\]┌─[\[\e[1;32m\u\e[0;31m\]]──[\e[1;37m\w\e[0;31m]──[\[\e[1;32m\]${HOSTNAME%%.*}\[\e[0;31m\]]\[\e[1;35m\]: \$\[\e[0;31m\]\n\[\e[0;31m\]└────╼ \[\e[1;35m\]>> \[\e[00;00m\]"

# cargo el ascii art

lolcat ascii.txt
#lolcat unixport

export LS_OPTIONS='--color=auto'
#export TERM=rxvt
export TERM=xterm

eval "`dircolors`"
alias ls='ls $LS_OPTIONS'
alias cl='clear && . .bashrc'

#ALIAS:
alias ll='ls -l'


# MONITORS


PATH="/sbin:/home/wherrera/perl5/bin${PATH:+:${PATH}}"; export PATH;
PERL5LIB="/home/wherrera/perl5/lib/perl5${PERL5LIB:+:${PERL5LIB}}"; export PERL5LIB;
PERL_LOCAL_LIB_ROOT="/home/wherrera/perl5${PERL_LOCAL_LIB_ROOT:+:${PERL_LOCAL_LIB_ROOT}}"; export PERL_LOCAL_LIB_ROOT;
PERL_MB_OPT="--install_base \"/home/wherrera/perl5\""; export PERL_MB_OPT;
PERL_MM_OPT="INSTALL_BASE=/home/wherrera/perl5"; export PERL_MM_OPT;
