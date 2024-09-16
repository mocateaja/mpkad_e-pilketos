@echo off

:: Menjalankan file Python
python "%~dp0main.py"

:: Memeriksa apakah file python berhasil dijalankan
if %errorlevel% neq 0 (
    echo Python script failed to execute.
    pause
    exit /b %errorlevel%
)

:: Jika Python berhasil, lanjutkan menjalankan Node.js
echo Python script executed successfully. Now running Node.js...
node "%~dp0index.js"

:: Memeriksa apakah file Node.js berhasil dijalankan
if %errorlevel% neq 0 (
    echo Node.js script failed to execute.
    pause
    exit /b %errorlevel%
)

:: Menjaga jendela cmd tetap terbuka setelah kedua script dijalankan
echo Both scripts executed successfully.
pause
