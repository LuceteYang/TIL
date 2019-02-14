# zsh와 oh-my-zsh의 설치와 사용법

### Install iTerm2
```zsh
$ brew cask install iterm2
```

### Install ZSH
```zsh
$ brew update
$ brew install zsh
$ zsh --version
```
#### 단축키
* `cmd + t` 새탭
* `cmd + w` 탭 닫기


### Install Oh My Zsh
```zsh
sh -c "$(curl -fsSL https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
```

### 테마 적용하기
```zsh
$ vim ~/.zshrc
$ ZSH_THEME="agnoster"
$ source ~/.zshrc
```

### 커스텀 적용하기
[hyperzsh 적용](https://github.com/tylerreckart/hyperzsh)
```zsh
$ mkdir $ZSH_CUSTOM/themes
$ wget -O $ZSH_CUSTOM/themes/hyperzsh.zsh-theme https://raw.githubusercontent.com/tylerreckart/hyperzsh/master/hyperzsh.zsh-theme
$ vim ~/.zshrc
# Set ZSH_THEME="current_theme" to ZSH_THEME="hyperzsh"
```

### oh-my-zsh 삭제
```zsh
$ rm -rf ~/.oh-my-zsh
$ rm ~/.zshrc
$ cp ~/.zshrc.pre-oh-my-zsh ~/.zshrc
$ source ~/.zshrc
```

### plugins
```zsh
plugins=(git osx python pip github zsh-autosuggestions zsh-syntax-highlighting)
```

### iterm2 한글 깨질시
폰트 다운받아서 해결  
https://hjh5488.tistory.com/2