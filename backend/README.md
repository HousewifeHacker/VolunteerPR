## Backend Setup

If you're on MacOS, you can install Pipenv easily with Homebrew:

```
brew install pipenv
```

Or, if you're using Ubuntu:

```
sudo apt install pipenv
```

Then setup the project:

```
pipenv install
pipenv install --dev
python manage.py migrate
python manage.py createsuperuser
```


## Pipenv basics
To run a command from bash like `python main.py`:

```
pipenv run python main.py
```

