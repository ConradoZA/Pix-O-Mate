# PixOMateLovingKittens

---
Welcome to a website where all cat-lovers can gather, talk and find each other!...<br>
Their actual cats will be added in a future update.<br>
... Oh, just one caveat: whenever you ask for new information, Zod kills one kitten 😉

It's a frontend "trucho" made with Angular.

- ⚓ [Requires](#⚓-requires)
- 🚥 [Install](#🚥-install)
- 🖱️ [Functionality](#🖱️-functionality)
- 🤓 [Geek References](#🤓-geek-references)

---

## ⚓ Requires

- [npm](https://nodejs.org)
- [Angular CLI](https://github.com/angular/angular-cli)

## 🚥 Install

### 1 - Clone the repository

You can either clone it with git in a terminal ([git required](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)):

```bash
git clone https://github.com/ConradoZA/Pix-O-Mate.git

```

Or you can navigate to my repository ([here](https://github.com/ConradoZA/Pix-O-Mate)), click on "Clone" > "Download ZIP" and uncompress it.

### 2 - Install dependencies

Navigate inside the project folder and, in a terminal, execute this:

```bash
npm install
```

### 3 - Configure API token

If you want to see any kind of data, you need to go to [Go REST](https://gorest.co.in/), create an account and copy your "API Access Token".<br>
Then, navigate to the project folder and there to /src/app/settings/<br>
Inside the archive "api-token.example.ts", substitute everything within apostrophes with your personal token.<br>
**Save**.<br>
And **_rename_** "api-token.example.ts" to "api-token.ts"

### 4 - Start the server/application

```bash
ng serve
```

You can use " -o" to automatically open a tab in your default browser when it finish compiling.

## 🖱️ Functionality

### Header

You can see all the kitties you have killed (⚠️ACHTUNG!, Zod remembers all the kitties you have killed in the past!),<br>
a button to go back to [Home](#home-page), where are you and how many users you have ["favorited"](#favorites-list).

㊙️

### Home Page

Three buttons:

- [Dueños](#owners)
- [Buscar](#search)
- [Soy Pro](#i'm-pro)

<p align="center"><img src="https://github.com/ConradoZA/Readme-assets/blob/master/PoM-home.png" max-width="80%"></p>

### Owners

Here you can see a list of all the users registered, 20 per page, previous page, next page buttons, and "go to X page" navigation.

You can click in one user to see his/her [detail card](#detail-card), or click in "ver" to see his/her [comments](#comments).

<p align="center"><img src="https://github.com/ConradoZA/Readme-assets/blob/master/PoM-owners.png" max-width="80%"></p>

### Search

Here you start seeing the first page of all users, but you can search by name.

You need to type at least two characters for the search button to appear.<br>
You can also just stop typing for two seconds and the engine will automatically start searching (again, you need to at least have typed two characters)

Results are shown 20 per page and you have all the navigation buttons: previous page, next page and "go to X" page.<br>
You can click in one user to see his/her [detail card](#detail-card), or click in "ver" to see his/her [comments](#comments).

<p align="center"><img src="https://github.com/ConradoZA/Readme-assets/blob/master/PoM-search.png" max-width="80%"></p>

### I'm Pro

Here you see a list of 13 results (I don't believe in this kind of bad luck [⛎](https://saintseiya.fandom.com/wiki/Ophiuchus_Odysseus)) and a scroll to see all the rest.

There is no navigation buttons because when you reach the end of the list, it automatically fetchs you the next 20 results ([all kneel before Zod!](https://www.youtube.com/watch?v=VPAaSqwZGzk))<br>
That's called _infinite scroll_.<br>
Again, there is a search field where you can search by name (you can go to [Search](#search) to read it's abilities)

Here the search field doesn't automatically resets after a search so you can remember what you are searching.

<p align="center"><img src="https://github.com/ConradoZA/Readme-assets/blob/master/PoM-pro.png" max-width="80%"></p>

### Detail Card

Here you see all the info there is available about a certain registered user.

His/her status (Active/Inactive) is updated every Monday and Thursday at midnight, so we have made sure Zod doesn't kill a kitten if isn't necessary.<br>
Also, you can see since when he/she has been registered in a "for" format ("for 3 years, 2 months, 13 days and 21 hours")

<p align="center"><img src="https://github.com/ConradoZA/Readme-assets/blob/master/PoM-details.png" max-width="80%"></p>

㊙️

### Favorites List

You can see a list of all the users you have made your favorites for whatever reason.<br>
You can click in the "X" icon to erase that user from the list... or you can click to see his/her [detail card](#detail-card) and maybe erase him/her from there.

<p align="center"><img src="https://github.com/ConradoZA/Readme-assets/blob/master/PoM-favorites.png" max-width="80%"></p>

### Comments

You can see a list of all the comment this user has written... or none.

<p align="center"><img src="https://github.com/ConradoZA/Readme-assets/blob/master/PoM-comments.png" max-width="80%"></p>

㊙️

## 🤓 Geek References

- "Trucho" => A Spanish word for "sample" or "demonstration"... Also, a [male trout](https://www.senorcool.com/en/system/files/styles/artwork_artprint/private/senorcool_malagoncita_te_quiero_mucho_como_la_trucha_al_trucho.png?itok=8VEgKDrW).
- ㊙️ => "Himitsu", "Secret" in japanese. It means there is some kind of Easter Egg around here... Hint, hint...
- "Who the hell is Zod?" => [Zod](https://en.wikipedia.org/wiki/General_Zod).
- ["Oh, Zod"](https://www.youtube.com/watch?v=dnew78z1a-s).
- [Achtung!](https://www.youtube.com/watch?v=ksmuG8z5zAY) => German word for "attention!", "look out!" or "danger!".
- [⛎](#i'm-pro) => C'mon, click on there... Oh, well: it's the thirteen "unofficial" horoscope sign, ["Ophiuchus"](https://duckduckgo.com/?q=Ophiuchus)... but click there 😉
