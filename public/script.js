
document.addEventListener('DOMContentLoaded', () => {
    const url = 'https://api.quizforbiz.ru';
    const buttonQuiz = document.querySelector('#qw-buttonQuiz');
    const quiz = document.querySelector('#qw-Quiz');

    // Базовые стили для квиза с медиа-запросами
    quiz.style.cssText = `
        display: none;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 1264px;
        max-width: 90%;
        height: 672px;
        max-height: 90%;
        border-radius: 33.62px;
        overflow: hidden;
        z-index: 1000;
        
        @media (max-width: 768px) {
            width: 95%;
            height: 90vh;
            border-radius: 20px;
        }
        
        @media (max-width: 576px) {
            width: 100%;
            height: 100vh;
            max-height: 100%;
            border-radius: 0;
            top: 0;
            left: 0;
            transform: none;
        }
    `;

    // SVG иконки
    const imgs = {
        next: 'PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTE1LjcwNzEgOC43MDcxMUMxNi4wOTc2IDguMzE2NTggMTYuMDk3NiA3LjY4MzQyIDE1LjcwNzEgNy4yOTI4OUw5LjM0MzE1IDAuOTI4OTMyQzguOTUyNjIgMC41Mzg0MDggOC4zMTk0NiAwLjUzODQwOCA3LjkyODkzIDAuOTI4OTMyQzcuNTM4NDEgMS4zMTk0NiA3LjUzODQxIDEuOTUyNjIgNy45Mjg5MyAyLjM0MzE1TDEzLjU4NTggOEw3LjkyODkzIDEzLjY1NjlDNy41Mzg0MSAxNC4wNDc0IDcuNTM4NDEgMTQuNjgwNSA3LjkyODkzIDE1LjA3MTFDOC4zMTk0NiAxNS40NjE2IDguOTUyNjIgMTUuNDYxNiA5LjM0MzE1IDE1LjA3MTFMMTUuNzA3MSA4LjcwNzExWk0wIDlIMTVWN0gwVjlaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K',
        back: 'PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTAuMjkyODkyIDcuMjkyODlDLTAuMDk3NjMxNSA3LjY4MzQyIC0wLjA5NzYzMTQgOC4zMTY1OCAwLjI5Mjg5MyA4LjcwNzExTDYuNjU2ODUgMTUuMDcxMUM3LjA0NzM4IDE1LjQ2MTYgNy42ODA1NCAxNS40NjE2IDguMDcxMDcgMTUuMDcxMUM4LjQ2MTU5IDE0LjY4MDUgOC40NjE1OSAxNC4wNDc0IDguMDcxMDcgMTMuNjU2OUwyLjQxNDIxIDhMOC4wNzEwNyAyLjM0MzE1QzguNDYxNTkgMS45NTI2MiA4LjQ2MTU5IDEuMzE5NDYgOC4wNzEwNyAwLjkyODkzM0M3LjY4MDU0IDAuNTM4NDA5IDcuMDQ3MzggMC41Mzg0MDkgNi42NTY4NSAwLjkyODkzM0wwLjI5Mjg5MiA3LjI5Mjg5Wk0xNiA3TDAuOTk5OTk5IDdMLjAwMDAwMSA5TDE2IDlMMTYgN1oiIGZpbGw9IiM2QTg0OTYiLz4KPC9zdmc+Cg==',
        close: 'PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHZpZXdCb3g9IjAgMCAxOCAxOCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgY2xpcC1wYXRoPSJ1cmwoI2NsaXAwXzI2NDVfMTQ4NzYpIj4KPHBhdGggZD0iTTE3LjgzNjIgMTQuNDYxMkwxMi4zNzU0IDkuMDAwNDRMMTcuODM2MiAzLjUzOTY5QzE3Ljk0MDggMy40MzM3OCAxNy45OTk1IDMuMjkwODkgMTcuOTk5NSAzLjE0MkMxNy45OTk1IDIuOTkzMTIgMTcuOTQwOCAyLjg1MDIzIDE3LjgzNjIgMi43NDQzMkwxNS4yNTY2IDAuMTY0NjkyQzE1LjE1MTEgMC4wNTkyMzk5IDE1LjAwOCAwIDE0Ljg1ODkgMEMxNC43MDk3IDAgMTQuNTY2NyAwLjA1OTIzOTkgMTQuNDYxMiAwLjE2NDY5Mkw5LjAwMDQ0IDUuNjI1NDRMMy41Mzk2OSAwLjE2NDY5MkMzLjQzNDIxIDAuMDU5MjM5OSAzLjI5MTE2IDAgMy4xNDIgMEMyLjk5Mjg1IDAgMi44NDk4IDAuMDU5MjM5OSAyLjc0NDMyIDAuMTY0NjkyTDAuMTY0NjkyIDIuNzQ0MzJDMC4wNTkyMzk5IDIuODQ5OCAwIDIuOTkyODUgMCAzLjE0MkMwIDMuMjkxMTYgMC4wNTkyMzk5IDMuNDM0MjEgMC4xNjQ2OTIgMy41Mzk2OUw1LjYyNTQ0IDkuMDAwNDRMMC4xNjQ2OTIgMTQuNDYxMkMwLjA1OTIzOTkgMTQuNTY2NyAwIDE0LjcwOTcgMCAxNC44NTg5QzAgMTUuMDA4IDAuMDU5MjM5OSAxNS4xNTExIDAuMTY0NjkyIDE1LjI1NjZMMi43NDQzMiAxNy44MzYyQzIuODQ5OCAxNy45NDE2IDIuOTkyODUgMTguMDAwOSAzLjE0MiAxOC4wMDA5QzMuMjkxMTYgMTguMDAwOSAzLjQzNDIxIDE3Ljk0MTYgMy41Mzk2OSAxNy44MzYyTDkuMDAwNDQgMTIuMzc1NEwxNC40NjEyIDE3LjgzNjJDMTQuNTY2NyAxNy45NDE2IDE0LjcwOTcgMTguMDAwOSAxNC44NTg5IDE4LjAwMDlDMTUuMDA4IDE4LjAwMDkgMTUuMTUxMSAxNy45NDE2IDE1LjI1NjYgMTcuODM2MkwxNy44MzYyIDE1LjI1NjZDMTcuOTQxNiAxNS4xNTExIDE4LjAwMDkgMTUuMDA4IDE4LjAwMDkgMTQuODU4OUMxOC4wMDA5IDE0LjcwOTcgMTcuOTQxNiAxNC41NjY3IDE3LjgzNjIgMTQuNDYxMloiIGZpbGw9IndoaXRlIi8+CjwvZz4KPGRlZnM+CjxjbGlwUGF0aCBpZD0iY2xpcDBfMjY0NV8xNDg3NiI+CjxyZWN0IHdpZHRoPSIxOCIgaGVpZ2h0PSIxOCIgZmlsbD0id2hpdGUiLz4KPC9jbGlwUGF0aD4KPC9kZWZzPgo8L3N2Zz4K',
        person: 'PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMjIiIHZpZXdCb3g9IjAgMCAyMSAyMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTAuMjIzOSIgY3k9IjUuNzQ5MjkiIHI9IjMuMzk1NzciIGZpbGw9IiM2QTg0OTYiLz4KPGVsbGlwc2UgY3g9IjEwLjIyMzgiIGN5PSIxNS4wODcyIiByeD0iNS45NDI2IiByeT0iMy4zOTU3NyIgZmlsbD0iIzZBODQ5NiIvPgo8L3N2Zz4K',
        email: 'PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0zLjE3MTU3IDUuMTcxNTdDMiA2LjM0MzE1IDIgOC4yMjg3NiAyIDEyQzIgMTUuNzcxMiAyIDE3LjY1NjkgMy4xNzE1NyAxOC44Mjg0QzQuMzQzMTUgMjAgNi4yMjg3NiAyMCAxMCAyMEgxNEMxNy43NzEyIDIwIDE5LjY1NjkgMjAgMjAuODI4NCAxOC44Mjg0QzIyIDE3LjY1NjkgMjIgMTUuNzcxMiAyMiAxMkMyMiA4LjIyODc2IDIyIDYuMzQzMTUgMjAuODI4NCA1LjE3MTU3QzE5LjY1NjkgNCAxNy43NzEyIDQgMTQgNEgxMEM2LjIyODc2IDQgNC4zNDMxNSA0IDMuMTcxNTcgNS4xNzE1N1pNMTguNTc2MiA3LjUxOTg2QzE4Ljg0MTMgNy44MzgwNyAxOC43OTgzIDguMzEwOTkgMTguNDgwMSA4LjU3NjE3TDE2LjI4MzcgMTAuNDA2NkMxNS4zOTczIDExLjE0NTIgMTQuNjc4OSAxMS43NDM5IDE0LjA0NDggMTIuMTUxN0MxMy4zODQzIDEyLjU3NjUgMTIuNzQxMSAxMi44NDQ5IDEyIDEyLjg0NDlDMTEuMjU4OSAxMi44NDQ5IDEwLjYxNTcgMTIuNTc2NSA5Ljk1NTE4IDEyLjE1MTdDOS4zMjExMiAxMS43NDM5IDguNjAyNzEgMTEuMTQ1MiA3LjcxNjM2IDEwLjQwNjZMNS41MTk4NiA4LjU3NjE3QzUuMjAxNjUgOC4zMTA5OSA1LjE1ODY2IDcuODM4MDcgNS40MjM4MyA3LjUxOTg2QzUuNjg5MDEgNy4yMDE2NSA2LjE2MTkzIDcuMTU4NjYgNi40ODAxNCA3LjQyMzgzTDguNjM5MDMgOS4yMjI5MUM5LjU3MTk5IDEwLjAwMDQgMTAuMjE5NyAxMC41Mzg0IDEwLjc2NjYgMTAuODkwMUMxMS4yOTU5IDExLjIzMDYgMTEuNjU0OSAxMS4zNDQ5IDEyIDExLjM0NDlDMTIuMzQ1MSAxMS4zNDQ5IDEyLjcwNDEgMTEuMjMwNiAxMy4yMzM0IDEwLjg5MDFDMTMuNzgwMyAxMC41Mzg0IDE0LjQyOCAxMC4wMDA0IDE1LjM2MSA5LjIyMjkxTDE3LjUxOTkgNy40MjM4M0MxNy44MzgxIDcuMTU4NjYgMTguMzExIDcuMjAxNjUgMTguNTc2MiA3LjUxOTg2WiIgZmlsbD0iIzZBODQ5NiIvPgo8L3N2Zz4K',
        phone: 'PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEwLjAzNzYgNS4zMTYxN0wxMC42ODY2IDYuNDc5MUMxMS4yNzIzIDcuNTI4NTggMTEuMDM3MiA4LjkwNTMyIDEwLjExNDcgOS44Mjc4QzEwLjExNDcgOS44Mjc4IDEwLjExNDcgOS44Mjc4IDEwLjExNDcgOS44Mjc4QzEwLjExNDYgOS44Mjc5MiA4Ljk5NTg4IDEwLjk0NjggMTEuMDI0NSAxMi45NzU1QzEzLjA1MjUgMTUuMDAzNSAxNC4xNzE0IDEzLjg4NjEgMTQuMTcyMiAxMy44ODUzQzE0LjE3MjIgMTMuODg1MyAxNC4xNzIyIDEzLjg4NTMgMTQuMTcyMiAxMy44ODUzQzE1LjA5NDcgMTIuOTYyOCAxNi40NzE0IDEyLjcyNzcgMTcuNTIwOSAxMy4zMTM0TDE4LjY4MzggMTMuOTYyNEMyMC4yNjg2IDE0Ljg0NjggMjAuNDU1NyAxNy4wNjkyIDE5LjA2MjggMTguNDYyMkMxOC4yMjU4IDE5LjI5OTIgMTcuMjAwNCAxOS45NTA1IDE2LjA2NjkgMTkuOTkzNEMxNC4xNTg4IDIwLjA2NTggMTAuOTE4MyAxOS41ODI5IDcuNjY3NzEgMTYuMzMzM0M0LjQxNzEzIDEzLjA4MTcgMy45MzQyMSA5Ljg0MTIyIDQuMDA2NTUgNy45MzMwOUM0LjA0OTUyIDYuNzk5NiA0LjcwMDggNS43NzQyMyA1LjUzNzgxIDQuOTM3MjNDNi45MzA3NiAzLjU0NDI4IDkuMTUzMTcgMy43MzE0NCAxMC4wMzc2IDUuMzE2MTdaIiBmaWxsPSIjNkE4NDk2Ii8+CjxwYXRoIGQ9Ik0xMy4yNTk1IDEuODc5ODNDMTMuMzI1NyAxLjQ3MDk0IDEzLjcxMjIgMS4xOTM1NyAxNC4xMjExIDEuMjU5NzZDMTQuMTQ2NCAxLjI2NDYxIDE0LjIyNzkgMS4yNzk4MyAxNC4yNzA1IDEuMjg5MzNDMTQuMzU1OSAxLjMwODM0IDE0LjQ3NDkgMS4zMzc1OSAxNC42MjMzIDEuMzgwODJDMTQuOTIwMSAxLjQ2NzI2IDE1LjMzNDcgMS42MDk2NyAxNS44MzIzIDEuODM3OEMxNi44Mjg2IDIuMjk0NTYgMTguMTU0NCAzLjA5MzU2IDE5LjUzMDIgNC40NjkzNkMyMC45MDYgNS44NDUxNiAyMS43MDUgNy4xNzA5NyAyMi4xNjE3IDguMTY3MjVDMjIuMzg5OSA4LjY2NDg3IDIyLjUzMjMgOS4wNzk0NyAyMi42MTg3IDkuMzc2MjVDMjIuNjYxOSA5LjUyNDY2IDIyLjY5MTIgOS42NDM2OSAyMi43MTAyIDkuNzI5MDFDMjIuNzE5NyA5Ljc3MTY4IDIyLjcyNjcgOS44MDU5NCAyMi43MzE1IDkuODMxMjVMMjIuNzM3MyA5Ljg2MjQ1QzIyLjgwMzQgMTAuMjcxMyAyMi41Mjg2IDEwLjY3MzkgMjIuMTE5NyAxMC43NDAxQzIxLjcxMiAxMC44MDYxIDIxLjMyNzkgMTAuNTMgMjEuMjYwMSAxMC4xMjMxQzIxLjI1OCAxMC4xMTIxIDIxLjI1MjIgMTAuMDgyOCAyMS4yNDYxIDEwLjA1NTFDMjEuMjMzNyA5Ljk5OTcgMjEuMjEyNCA5LjkxMTg4IDIxLjE3ODYgOS43OTU3MkMyMS4xMTA5IDkuNTYzMzkgMjAuOTkzNCA5LjIxODA2IDIwLjc5ODIgOC43OTIzOEMyMC40MDg0IDcuOTQyMDcgMTkuNzA3NCA2Ljc2Nzg5IDE4LjQ2OTUgNS41MzAwMkMxNy4yMzE3IDQuMjkyMTYgMTYuMDU3NSAzLjU5MTE3IDE1LjIwNzIgMy4yMDEzNEMxNC43ODE1IDMuMDA2MTggMTQuNDM2MiAyLjg4ODY1IDE0LjIwMzggMi44MjA5N0MxNC4wODc3IDIuNzg3MTQgMTMuOTQxNyAyLjc1MzYzIDEzLjg4NjMgMi43NDEzQzEzLjQ3OTMgMi42NzM0NyAxMy4xOTM1IDIuMjg3NTUgMTMuMjU5NSAxLjg3OTgzWiIgZmlsbD0iIzZBODQ5NiIvPgo8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTEzLjQ4NTcgNS4zMjkzQzEzLjU5OTUgNC45MzEwMiAxNC4wMTQ2IDQuNzAwNCAxNC40MTI5IDQuODE0MTlMMTQuMjA2OSA1LjUzNTM0QzE0LjQxMjkgNC44MTQxOSAxNC40MTI5IDQuODE0MTkgMTQuNDEyOSA0LjgxNDE5TDE0LjQxNDQgNC44MTQ2MUwxNC40MTU5IDQuODE1MDVMMTQuNDE5MiA0LjgxNjAyTDE0LjQyNyA0LjgxODM0TDE0LjQ0NjggNC44MjQ1QzE0LjQ2MTggNC44MjkzMiAxNC40ODA3IDQuODM1NiAxNC41MDMxIDQuODQzNTdDMTQuNTQ4IDQuODU5NTEgMTQuNjA3NCA0Ljg4MjE3IDE0LjY4MDIgNC45MTMzN0MxNC44MjU5IDQuOTc1ODEgMTUuMDI0OSA1LjA3MjIzIDE1LjI2OTUgNS4yMTY5NEMxNS43NTg5IDUuNTA2NjIgMTYuNDI3MSA1Ljk4NzggMTcuMjEyMSA2Ljc3Mjc3QzE3Ljk5NzEgNy41NTc3NSAxOC40NzgyIDguMjI1OTMgMTguNzY3OSA4LjcxNTRDMTguOTEyNiA4Ljk1OTkxIDE5LjAwOSA5LjE1ODk3IDE5LjA3MTUgOS4zMDQ2NkMxOS4xMDI3IDkuMzc3NDYgMTkuMTI1NCA5LjQzNjgyIDE5LjE0MTMgOS40ODE3M0MxOS4xNDkzIDkuNTA0MTggMTkuMTU1NSA5LjUyMzAxIDE5LjE2MDQgOS41MzgwOUwxOS4xNjY1IDkuNTU3ODhMMTkuMTY4OCA5LjU2NTYzTDE5LjE2OTggOS41Njg5NkwxOS4xNzAyIDkuNTcwNUMxOS4xNzAyIDkuNTcwNSAxOS4xNzA3IDkuNTcxOTQgMTguNDQ5NSA5Ljc3Nzk4TDE5LjE3MDcgOS41NzE5NEMxOS4yODQ1IDkuOTcwMjEgMTkuMDUzOCAxMC4zODUzIDE4LjY1NTYgMTAuNDk5MUMxOC4yNjA3IDEwLjYxMTkgMTcuODQ5MiAxMC4zODYyIDE3LjczMTMgOS45OTQxM0wxNy43Mjc2IDkuOTgzMzVDMTcuNzIyMyA5Ljk2ODMyIDE3LjcxMTMgOS45Mzg3NCAxNy42OTI4IDkuODk1NTRDMTcuNjU1OCA5LjgwOTIgMTcuNTg4NyA5LjY2Nzk3IDE3LjQ3NzEgOS40NzkzOEMxNy4yNTQxIDkuMTAyNjQgMTYuODUxNCA4LjUzMzM5IDE2LjE1MTQgNy44MzM0M0MxNS40NTE1IDcuMTMzNDggMTQuODgyMiA2LjczMDc4IDE0LjUwNTUgNi41MDc4MUMxNC4zMTY5IDYuMzk2MTkgMTQuMTc1NyA2LjMyOTA5IDE0LjA4OTMgNi4yOTIwOUMxNC4wNDYxIDYuMjczNTggMTQuMDE2NSA2LjI2MjU0IDE0LjAwMTUgNi4yNTcyMUwxMy45OTA3IDYuMjUzNTJDMTMuNTk4NyA2LjEzNTY0IDEzLjM3MjkgNS43MjQxOSAxMy40ODU3IDUuMzI5M1oiIGZpbGw9IiM2QTg0OTYiLz4KPC9zdmc+Cg==',
        close2: 'PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHZpZXdCb3g9IjAgMCAxOCAxOCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTE3LjgzNjIgMTQuNDYxMkwxMi4zNzU0IDkuMDAwNDRMMTcuODM2MiAzLjUzOTY5QzE3Ljk0MDggMy40MzM3OCAxNy45OTk1IDMuMjkwODkgMTcuOTk5NSAzLjE0MkMxNy45OTk1IDIuOTkzMTIgMTcuOTQwOCAyLjg1MDIzIDE3LjgzNjIgMi43NDQzMkwxNS4yNTY2IDAuMTY0NjkyQzE1LjE1MTEgMC4wNTkyMzk5IDE1LjAwOCAwIDE0Ljg1ODkgMEMxNC43MDk3IDAgMTQuNTY2NyAwLjA1OTIzOTkgMTQuNDYxMiAwLjE2NDY5Mkw5LjAwMDQ0IDUuNjI1NDRMMy41Mzk2OSAwLjE2NDY5MkMzLjQzNDIxIDAuMDU5MjM5OSAzLjI5MTE2IDAgMy4xNDIgMEMyLjk5Mjg1IDAgMi44NDk4IDAuMDU5MjM5OSAyLjc0NDMyIDAuMTY0NjkyTDAuMTY0NjkyIDIuNzQ0MzJDMC4wNTkyMzk5IDIuODQ5OCAwIDIuOTkyODUgMCAzLjE0MkMwIDMuMjkxMTYgMC4wNTkyMzk5IDMuNDM0MjEgMC4xNjQ2OTIgMy41Mzk2OUw1LjYyNTQ0IDkuMDAwNDRMMC4xNjQ2OTIgMTQuNDYxMkMwLjA1OTIzOTkgMTQuNTY2NyAwIDE0LjcwOTcgMCAxNC44NTg5QzAgMTUuMDA4IDAuMDU5MjM5OSAxNS4xNTExIDAuMTY0NjkyIDE1LjI1NjZMMi43NDQzMiAxNy44MzYyQzIuODQ5OCAxNy45NDE2IDIuOTkyODUgMTguMDAwOSAzLjE0yIDE4LjAwMDlDMy4yOTExNiAxOC4wMDA5IDMuNDM0MjEgMTcuOTQxNiAzLjUzOTY5IDE3LjgzNjJMOS4wMDA0NCAxMi4zNzU0TDE0LjQ2MTIgMTcuODM2MkMxNC41NjY3IDE3Ljk0MTYgMTQuNzA5NyAxOC4wMDA5IDE0Ljg1ODkgMTguMDAwOUMxNS4wMDggMTguMDAwOSAxNS4xNTExIDE3Ljk0MTYgMTUuMjU2NiAxNy44MzYyTDE3LjgzNjIgMTUuMjU2NkMxNy45NDE2IDE1LjE1MTEgMTguMDAwOSAxNS4wMDggMTguMDAwOSAxNC44NTg5QzE4LjAwMDkgMTQuNzA5NyAxNy45NDE2IDE0LjU2NjcgMTcuODM2MiAxNC40NjEyWiIgZmlsbD0iIzExMTcxQyIvPgo8L3N2Zz4K'
    };

    let currentCanvas = 1;
    let currentIndex = 0;
    let data = {};
    const isMobile = window.innerWidth < 576;
    const userData = {
        date: '',
        position: '',
        quiz_id: Quiz_id,
        name: null,
        email: null,
        phone: null,
        details: {
            answers: [],
            url: '',
            ip: ''
        }
    };

    // Создаем кнопку закрытия с адаптивными стилями
    const closeButton = document.createElement('button');
    closeButton.id = 'qw-closeButton';
    closeButton.style.cssText = `
        display: none;
        position: fixed;
        top: calc(44% - 336px - 20px);
        right: calc(49% - 632px - 60px);
        width: 40px;
        height: 40px;
        border: none;
        background: none;
        cursor: pointer;
        z-index: 1001;
        transition: all 0.2s ease;
        
        @media (max-width: 768px) {
            top: 20px;
            right: 20px;
        }
        
        @media (max-width: 576px) {
            top: 10px;
            right: 10px;
            width: 30px;
            height: 30px;
        }
    `;
    closeButton.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6L18 18" stroke="#333333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    `;
    closeButton.setAttribute('aria-label', 'Закрыть');
    document.body.appendChild(closeButton);

    const City = async() => {
        try {
            const response = await fetch('http://ip-api.com/json/');
            const data = await response.json();
            userData.position = data.city;
            userData.details.ip = data.query;
            userData.details.url = window.location.href;
        } catch (error) {
            console.error('Ошибка при получении города:', error);
        }
    };

    function formatDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }

    const answer = (index, questionData) => {
        const selectedAnswer = questionData.answers[index];
        const currentAnswers = userData.details.answers[currentIndex].answer;

        if (questionData.multiple) {
            const answerIndex = currentAnswers.indexOf(selectedAnswer);
            if (answerIndex === -1) {
                currentAnswers.push(selectedAnswer);
            } else {
                currentAnswers.splice(answerIndex, 1);
            }
        } else {
            userData.details.answers[currentIndex].answer = [selectedAnswer];
        }
    };

    const renderCanvas = () => {
        quiz.innerHTML = `
            <div id="qw-canvas" style="
                width: 100%;
                height: 100%;
                position: relative;
                font-family: ${data.theme.font || 'inherit'};
            "></div>
        `;

        const canvas = document.getElementById('qw-canvas');

        buttonQuiz.addEventListener('click', () => {
            quiz.style.display = 'block';
            closeButton.style.display = 'block';
            STATUS(12);
        });

        closeButton.addEventListener('click', (e) => {
            e.preventDefault();
            quiz.style.display = 'none';
            closeButton.style.display = 'none';
        });

        if (userData.details.answers.length === 0 && data.canvas2) {
            userData.details.answers = data.canvas2.map(question => ({
                question: question.question,
                answer: []
            }));
        }

        switch (currentCanvas) {
            case 1:
                renderCanvas1(canvas);
                break;
            case 2:
                if (data.canvas2 && data.canvas2.length > 0) {
                    renderAnswers(canvas);
                } else {
                    currentCanvas = 3;
                    renderCanvas();
                }
                break;
            case 3:
                renderCanvas3(canvas);
                STATUS(11);
                break;
        }
    };

    const renderCanvas1 = (container) => {
        const { canvas1 } = data;
        const theme = data.theme;
        const alignType = canvas1.aling || 'canvas';

        // Определяем стиль кнопки
        const buttonStyle = theme.button_style || 'default';
        let buttonStyles = '';

        switch (buttonStyle) {
            case 'rounded':
                buttonStyles = `
                    border-radius: 50px;
                    background-color: ${theme.button_color || '#105EFE'};
                    color: ${theme.button_text_color || '#fff'};
                `;
                break;
            case 'square':
                buttonStyles = `
                    border-radius: 0;
                    background-color: ${theme.button_color || '#105EFE'};
                    color: ${theme.button_text_color || '#fff'};
                `;
                break;
            case 'outline':
                buttonStyles = `
                    background: transparent;
                    border: 2px solid ${theme.button_color || '#105EFE'};
                    color: ${theme.button_color || '#105EFE'};
                `;
                break;
            case 'default':
            default:
                buttonStyles = `
                    background-color: ${theme.button_color || '#105EFE'};
                    color: ${theme.button_text_color || '#fff'};
                    border-radius: 8px;
                `;
        }

        // Определяем стиль в зависимости от выбранного типа выравнивания
        if (alignType.includes('background')) {
            // Фоновый стиль с адаптацией
            const backgroundStyle = canvas1.video || canvas1.img ? '' : `background-color: ${theme.background_color || '#fff'};`;

            container.innerHTML = `
                <div style="
                    width: 100%;
                    height: 100%;
                    position: relative;
                    overflow: hidden;
                    ${backgroundStyle}
                ">
                    ${canvas1.video ? `
                    <video 
                        loop 
                        autoplay 
                        muted 
                        playsinline
                        style="
                            position: absolute;
                            width: 100%;
                            height: 100%;
                            object-fit: cover;
                        "
                    >
                        <source src="${canvas1.video}" type="video/mp4">
                    </video>
                    ` : canvas1.img ? `
                    <img 
                        src="${canvas1.img}" 
                        style="
                            position: absolute;
                            width: 100%;
                            height: 100%;
                            object-fit: cover;
                        "
                        alt="Фоновое изображение"
                    >
                    ` : ''}
                    
                    <div style="
                        position: absolute;
                        width: 100%;
                        height: 100%;
                        display: flex;
                        flex-direction: column;
                        padding: 40px;
                        box-sizing: border-box;
                        
                        @media (max-width: 768px) {
                            padding: 30px;
                        }
                        
                        @media (max-width: 576px) {
                            padding: 20px;
                        }
                    ">
                        <div style="
                            margin-top: auto;
                            margin-bottom: auto;
                            max-width: 600px;
                            ${alignType === 'background-left' ? 'margin-left: 0;' : 
                              alignType === 'background-center' ? 'margin-left: auto; margin-right: auto;' : 
                              'margin-left: auto;'}
                              
                            @media (max-width: 576px) {
                                max-width: 100%;
                                margin-left: auto;
                                margin-right: auto;
                            }
                        ">
                            ${canvas1.logo ? `
                            <div style="
                                width: 64px;
                                height: 64px;
                                border-radius: 50%;
                                background: url(${canvas1.logo}) center/cover;
                                margin-bottom: 24px;
                                
                                @media (max-width: 576px) {
                                    width: 48px;
                                    height: 48px;
                                    margin-bottom: 16px;
                                }
                            "></div>
                            ` : ''}
                            
                            ${canvas1.description ? `
                            <p style="
                                margin: 0;
                                font-size: 16px;
                                color: ${theme.text_color || '#333'};
                                margin-bottom: 24px;
                                
                                @media (max-width: 576px) {
                                    font-size: 14px;
                                    margin-bottom: 16px;
                                }
                            ">${canvas1.description}</p>
                            ` : ''}
                            
                            ${canvas1.title ? `
                            <h1 style="
                                margin: 0;
                                font-size: 28px;
                                font-weight: 600;
                                color: ${theme.text_color || '#333'};
                                margin-bottom: 20px;
                                
                                @media (max-width: 768px) {
                                    font-size: 24px;
                                }
                                
                                @media (max-width: 576px) {
                                    font-size: 22px;
                                    margin-bottom: 16px;
                                }
                            ">${canvas1.title}</h1>
                            ` : ''}
                            
                            ${canvas1.subtitle ? `
                            <h3 style="
                                margin: 0;
                                font-size: 18px;
                                color: ${theme.text_color || '#333'};
                                margin-bottom: 40px;
                                
                                @media (max-width: 768px) {
                                    font-size: 16px;
                                }
                                
                                @media (max-width: 576px) {
                                    font-size: 15px;
                                    margin-bottom: 30px;
                                }
                            ">${canvas1.subtitle}</h3>
                            ` : ''}
                            
                            <button 
                                id="changeCanvas" 
                                style="
                                    padding: 20px 40px;
                                    ${buttonStyles}
                                    border: none;
                                    font-size: 18px;
                                    cursor: pointer;
                                    margin-bottom: 40px;
                                    transition: all 0.2s ease;
                                    
                                    @media (max-width: 768px) {
                                        padding: 16px 32px;
                                        font-size: 16px;
                                    }
                                    
                                    @media (max-width: 576px) {
                                        width: 100%;
                                        padding: 14px;
                                        font-size: 15px;
                                        margin-bottom: 30px;
                                    }
                                "
                            >
                                ${canvas1.button}
                            </button>
                        </div>
                        
                        <div style="
                            margin-top: auto;
                            width: 100%;
                            display: flex;
                            justify-content: space-between;
                            align-items: flex-end;
                            
                            @media (max-width: 576px) {
                                flex-direction: column;
                                align-items: center;
                                gap: 12px;
                            }
                        ">
                            <div style="display: flex; flex-direction: column;
                                @media (max-width: 576px) {
                                    align-items: center;
                                    text-align: center;
                                }">
                                ${canvas1.tel ? `
                                <p style="
                                    margin: 0;
                                    font-size: 16px;
                                    color: ${theme.text_color || '#333'};
                                    
                                    @media (max-width: 576px) {
                                        font-size: 14px;
                                    }
                                ">${canvas1.tel}</p>
                                ` : ''}
                                
                                ${canvas1.name ? `
                                <p style="
                                    margin: 8px 0 0;
                                    font-size: 14px;
                                    color: ${theme.text_color || '#333'};
                                    
                                    @media (max-width: 576px) {
                                        margin: 4px 0 0;
                                        font-size: 12px;
                                    }
                                ">${canvas1.name}</p>
                                ` : ''}
                            </div>
                            
                            <a 
                                href="http://quizforbiz.ru" 
                                style="
                                    text-decoration: none;
                                    font-size: 14px;
                                    color: ${theme.text_color || '#333'};
                                    
                                    @media (max-width: 576px) {
                                        font-size: 12px;
                                    }
                                "
                            >
                                Создано в <span style="color: ${theme.button_color || '#105EFE'};">Quiz for biz</span>
                            </a>
                        </div>
                    </div>
                </div>
            `;
        } else if (alignType === 'canvas-center') {
            // Центрированный стиль с адаптацией
            container.innerHTML = `
                <div style="
                    width: 100%;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    padding: 40px;
                    box-sizing: border-box;
                    text-align: center;
                    background-color: ${theme.background_color || '#ffffff'};
                    overflow: auto;
                    
                    @media (max-width: 768px) {
                        padding: 30px;
                    }
                    
                    @media (max-width: 576px) {
                        padding: 20px;
                        justify-content: flex-start;
                    }
                ">
                    <!-- Логотип (только если есть) -->
                    ${canvas1.logo ? `
                    <div style="
                        width: 60px;
                        height: 60px;
                        min-width: 60px;
                        min-height: 60px;
                        border-radius: 50%;
                        background: url(${canvas1.logo}) center/cover;
                        margin: 0 auto ${canvas1.description ? '20px' : '0'} auto;
                        flex-shrink: 0;
                        
                        @media (max-width: 576px) {
                            width: 50px;
                            height: 50px;
                            min-width: 50px;
                            min-height: 50px;
                            margin-bottom: ${canvas1.description ? '16px' : '0'};
                        }
                    "></div>
                    ` : ''}
                    
                    <!-- Описание (только если есть) -->
                    ${canvas1.description ? `
                    <p style="
                        margin: 0;
                        font-size: 16px;
                        color: ${theme.text_color || '#333'};
                        margin-bottom: ${canvas1.title ? '24px' : '0'};
                        max-width: 100%;
                        padding: 0 20px;
                        word-break: break-word;
                        
                        @media (max-width: 576px) {
                            font-size: 14px;
                            margin-bottom: ${canvas1.title ? '16px' : '0'};
                            padding: 0 10px;
                        }
                    ">${canvas1.description}</p>
                    ` : ''}
                    
                    <!-- Заголовок (только если есть) -->
                    ${canvas1.title ? `
                    <h1 style="
                        margin: 0;
                        font-size: clamp(24px, 5vw, 28px);
                        font-weight: 600;
                        color: ${theme.text_color || '#333'};
                        margin-bottom: ${canvas1.subtitle ? '16px' : (canvas1.img || canvas1.video) ? '30px' : '20px'};
                        max-width: 100%;
                        padding: 0 20px;
                        
                        @media (max-width: 576px) {
                            margin-bottom: ${canvas1.subtitle ? '12px' : (canvas1.img || canvas1.video) ? '20px' : '16px'};
                            padding: 0 10px;
                        }
                    ">${canvas1.title}</h1>
                    ` : ''}
                    
                    <!-- Подзаголовок (только если есть) -->
                    ${canvas1.subtitle ? `
                    <h3 style="
                        margin: 0;
                        font-size: clamp(16px, 4vw, 18px);
                        color: ${theme.text_color || '#333'};
                        margin-bottom: ${(canvas1.img || canvas1.video) ? '30px' : '20px'};
                        max-width: 100%;
                        padding: 0 20px;
                        
                        @media (max-width: 576px) {
                            margin-bottom: ${(canvas1.img || canvas1.video) ? '20px' : '16px'};
                            padding: 0 10px;
                        }
                    ">${canvas1.subtitle}</h3>
                    ` : ''}
                    
                    <!-- Медиа-контент (только если есть) -->
                    ${(canvas1.img || canvas1.video) ? `
                    <div style="
                        width: 100%;
                        max-width: 300px;
                        height: 180px;
                        min-height: 150px;
                        margin-bottom: 30px;
                        border-radius: 16px;
                        overflow: hidden;
                        flex-shrink: 0;
                        border: none;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        background: transparent;
                        
                        @media (max-width: 576px) {
                            max-width: 100%;
                            height: 160px;
                            min-height: 120px;
                            margin-bottom: 20px;
                        }
                    ">
                        ${canvas1.video ? `
                        <video 
                            loop 
                            autoplay 
                            muted 
                            playsinline
                            style="
                                max-width: 100%;
                                max-height: 100%;
                                object-fit: contain;
                            "
                        >
                            <source src="${canvas1.video}" type="video/mp4">
                        </video>
                        ` : `
                        <img 
                            src="${canvas1.img}" 
                            style="
                                max-width: 100%;
                                max-height: 100%;
                                object-fit: contain;
                            "
                            alt="Изображение"
                        >
                        `}
                    </div>
                    ` : ''}
                    
                    <!-- Кнопка (всегда отображается) -->
                    <div style="
                        flex-grow: ${!(canvas1.img || canvas1.video) && !canvas1.subtitle && !canvas1.title && !canvas1.description ? '1' : '0'}; 
                        display: flex; 
                        flex-direction: column; 
                        justify-content: center;
                        width: 100%;
                    ">
                        <button 
                            id="changeCanvas" 
                            style="
                                padding: 16px 32px;
                                ${buttonStyles}
                                border: none;
                                font-size: clamp(16px, 4vw, 18px);
                                cursor: pointer;
                                margin: 0 auto;
                                width: auto;
                                max-width: 100%;
                                white-space: nowrap;
                                flex-shrink: 0;
                                
                                @media (max-width: 576px) {
                                    width: 100%;
                                    padding: 14px;
                                }
                            "
                        >
                            ${canvas1.button}
                        </button>
                    </div>
                    
                    <!-- Контакты (только если есть) -->
                    ${(canvas1.tel || canvas1.name) ? `
                    <div style="
                        margin-top: auto;
                        width: 100%;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        gap: 6px;
                        flex-shrink: 0;
                        padding-top: 10px;
                        padding-bottom: 10px;
                    ">
                        ${canvas1.tel ? `
                        <p style="
                            margin: 0;
                            font-size: 16px;
                            color: ${theme.text_color || '#333'};
                            white-space: nowrap;
                            
                            @media (max-width: 576px) {
                                font-size: 14px;
                            }
                        ">${canvas1.tel}</p>
                        ` : ''}
                        
                        ${canvas1.name ? `
                        <p style="
                            margin: 0;
                            font-size: 14px;
                            color: ${theme.text_color || '#333'};
                            white-space: nowrap;
                            
                            @media (max-width: 576px) {
                                font-size: 12px;
                            }
                        ">${canvas1.name}</p>
                        ` : ''}
                    </div>
                    ` : ''}
                    
                    <!-- Копирайт (всегда отображается) -->
                    <div style="
                        width: 100%;
                        display: flex;
                        justify-content: flex-end;
                        padding-top: 8px;
                        flex-shrink: 0;
                        ${!(canvas1.tel || canvas1.name) ? 'margin-top: auto;' : ''}
                        
                        @media (max-width: 576px) {
                            justify-content: center;
                        }
                    ">
                        <a 
                            href="http://quizforbiz.ru" 
                            style="
                                text-decoration: none;
                                font-size: 14px;
                                color: ${theme.text_color || '#333'};
                                
                                @media (max-width: 576px) {
                                    font-size: 12px;
                                }
                            "
                        >
                            Создано в <span style="color: ${theme.button_color || '#105EFE'};">Quiz for biz</span>
                        </a>
                    </div>
                </div>
            `;
        } else {
            // Стандартный стиль с адаптацией
            const imageDisplayStyle = theme.image_display || 'cover';
            const imagePosition = theme.image_position || 'left';

            container.innerHTML = `
                <div style="
                    display: flex; 
                    width: 100%; 
                    height: 100%; 
                    flex-direction: ${isMobile ? 'column' : 'row'}; 
                    background-color: ${theme.background_color || 'inherit'};
                    
                    @media (max-width: 576px) {
                        flex-direction: column;
                        overflow-y: auto;
                    }
                ">
                    ${imagePosition === 'right' ? `
                        <div style="
                            ${isMobile ? 'width: 100%; padding: 20px;' : 'width: 50%; padding: 40px;'} 
                            display: flex; 
                            flex-direction: column; 
                            justify-content: space-between; 
                            box-sizing: border-box; 
                            background-color: ${theme.background_color || 'inherit'};
                            
                            @media (max-width: 768px) {
                                padding: 30px;
                            }
                            
                            @media (max-width: 576px) {
                                width: 100%;
                                padding: 20px;
                                order: 2;
                            }
                        ">
                            <div style="display: flex; align-items: center; margin-bottom: 40px;
                                @media (max-width: 576px) {
                                    margin-bottom: 20px;
                                }">
                                <div style="
                                    width: 64px; 
                                    height: 64px; 
                                    border-radius: 50%; 
                                    background: ${canvas1.logo ? `url(${canvas1.logo})` : 'rgba(66, 87, 102, 0.52)'}; 
                                    background-size: cover; 
                                    margin-right: 24px;
                                    
                                    @media (max-width: 576px) {
                                        width: 48px;
                                        height: 48px;
                                        margin-right: 16px;
                                    }
                                "></div>
                                <p style="
                                    margin: 0; 
                                    font-size: 16px; 
                                    color: ${theme.text_color || 'inherit'};
                                    
                                    @media (max-width: 576px) {
                                        font-size: 14px;
                                    }
                                ">${canvas1.description}</p>
                            </div>
                            <div style="flex-grow: 1;">
                                <h1 style="
                                    margin: 0; 
                                    font-size: 28px; 
                                    margin-bottom: 20px; 
                                    font-weight: 600; 
                                    color: ${theme.text_color || 'inherit'};
                                    
                                    @media (max-width: 768px) {
                                        font-size: 24px;
                                    }
                                    
                                    @media (max-width: 576px) {
                                        font-size: 22px;
                                        margin-bottom: 16px;
                                    }
                                ">${canvas1.title}</h1>
                                <h3 style="
                                    margin: 0; 
                                    font-size: 18px; 
                                    margin-bottom: 40px; 
                                    color: ${theme.text_color || 'inherit'};
                                    
                                    @media (max-width: 768px) {
                                        font-size: 16px;
                                    }
                                    
                                    @media (max-width: 576px) {
                                        margin-bottom: 30px;
                                        font-size: 15px;
                                    }
                                ">${canvas1.subtitle}</h3>
                                <button id="changeCanvas" style="
                                    padding: 20px 40px;
                                    ${buttonStyles}
                                    border: none;
                                    font-size: 18px;
                                    cursor: pointer;
                                    margin: 0 auto;
                                    margin-top: 10px;
                                    transition: all 0.2s ease;
                                    
                                    @media (max-width: 768px) {
                                        padding: 16px 32px;
                                        font-size: 16px;
                                    }
                                    
                                    @media (max-width: 576px) {
                                        width: 100%;
                                        padding: 14px;
                                        font-size: 15px;
                                    }
                                ">
                                    ${canvas1.button}
                                </button>
                            </div>
                            <div style="
                                display: flex; 
                                justify-content: space-between; 
                                align-items: flex-end;
                                
                                @media (max-width: 576px) {
                                    flex-direction: column;
                                    align-items: center;
                                    gap: 12px;
                                    margin-top: 20px;
                                }
                            ">
                                <div style="text-align: left;
                                    @media (max-width: 576px) {
                                        text-align: center;
                                    }">
                                    <p style="
                                        margin: 0; 
                                        font-size: 16px; 
                                        color: ${theme.text_color || 'inherit'};
                                        
                                        @media (max-width: 576px) {
                                            font-size: 14px;
                                        }
                                    ">${canvas1.tel}</p>
                                    <p style="
                                        margin: 8px 0 0; 
                                        font-size: 14px; 
                                        color: ${theme.text_color || 'inherit'};
                                        
                                        @media (max-width: 576px) {
                                            margin: 4px 0 0;
                                            font-size: 12px;
                                        }
                                    ">${canvas1.name}</p>
                                </div>
                                <a href="http://quizforbiz.ru" style="
                                    text-decoration: none; 
                                    font-size: 14px; 
                                    color: ${theme.text_color || 'inherit'};
                                    
                                    @media (max-width: 576px) {
                                        font-size: 12px;
                                    }
                                ">
                                    Создано в <span style="color: #105EFE;">Quiz for biz</span>
                                </a>
                            </div>
                        </div>
                        ${canvas1.video ? `
                            <div style="
                                ${isMobile ? 'width: 100%; height: 200px;' : 'width: 50%; height: 100%;'} 
                                padding: 20px; 
                                box-sizing: border-box;
                                
                                @media (max-width: 576px) {
                                    order: 1;
                                    height: 180px;
                                    padding: 10px 20px;
                                }
                            ">
                                <video 
                                    loop 
                                    autoplay 
                                    muted 
                                    playsinline
                                    style="
                                        width: 100%; 
                                        height: 100%; 
                                        object-fit: ${imageDisplayStyle === 'contain' ? 'contain' : 'cover'}; 
                                        border-radius: 16px;
                                    "
                                >
                                    <source src="${canvas1.video}" type="video/mp4">
                                </video>
                            </div>
                        ` : `
                            <div style="
                                ${isMobile ? 'width: 100%; height: 200px;' : 'width: 50%; height: 100%;'} 
                                padding: 20px; 
                                box-sizing: border-box;
                                
                                @media (max-width: 576px) {
                                    order: 1;
                                    height: 180px;
                                    padding: 10px 20px;
                                }
                            ">
                                <div style="
                                    width: 100%;
                                    height: 100%;
                                    background: ${imageDisplayStyle === 'color' && theme.background_color ? theme.background_color : `url(${canvas1.img})`} 
                                    ${imageDisplayStyle === 'color' ? '' : `no-repeat ${imageDisplayStyle === 'contain' ? 'center center' : 'center center/cover'}`};
                                    border-radius: 16px;
                                "></div>
                            </div>
                        `}
                    ` : `
                        ${canvas1.video ? `
                            <div style="
                                ${isMobile ? 'width: 100%; height: 200px;' : 'width: 50%; height: 100%;'} 
                                padding: 20px; 
                                box-sizing: border-box;
                                
                                @media (max-width: 576px) {
                                    height: 180px;
                                    padding: 10px 20px;
                                }
                            ">
                                <video 
                                    loop 
                                    autoplay 
                                    muted 
                                    playsinline
                                    style="
                                        width: 100%; 
                                        height: 100%; 
                                        object-fit: ${imageDisplayStyle === 'contain' ? 'contain' : 'cover'}; 
                                        border-radius: 16px;
                                    "
                                >
                                    <source src="${canvas1.video}" type="video/mp4">
                                </video>
                            </div>
                        ` : `
                            <div style="
                                ${isMobile ? 'width: 100%; height: 200px;' : 'width: 50%; height: 100%;'} 
                                padding: 20px; 
                                box-sizing: border-box;
                                
                                @media (max-width: 576px) {
                                    height: 180px;
                                    padding: 10px 20px;
                                }
                            ">
                                <div style="
                                    width: 100%;
                                    height: 100%;
                                    background: ${imageDisplayStyle === 'color' && theme.background_color ? theme.background_color : `url(${canvas1.img})`} 
                                    ${imageDisplayStyle === 'color' ? '' : `no-repeat ${imageDisplayStyle === 'contain' ? 'center center' : 'center center/cover'}`};
                                    border-radius: 16px;
                                "></div>
                            </div>
                        `}
                        <div style="
                            ${isMobile ? 'width: 100%; padding: 20px;' : 'width: 50%; padding: 40px;'} 
                            display: flex; 
                            flex-direction: column; 
                            justify-content: space-between; 
                            box-sizing: border-box; 
                            background-color: ${theme.background_color || 'inherit'};
                            
                            @media (max-width: 768px) {
                                padding: 30px;
                            }
                            
                            @media (max-width: 576px) {
                                padding: 20px;
                            }
                        ">
                            <div style="display: flex; align-items: center; margin-bottom: 40px;
                                @media (max-width: 576px) {
                                    margin-bottom: 20px;
                                }">
                                <div style="
                                    width: 64px; 
                                    height: 64px; 
                                    border-radius: 50%; 
                                    background: ${canvas1.logo ? `url(${canvas1.logo})` : 'rgba(66, 87, 102, 0.52)'}; 
                                    background-size: cover; 
                                    margin-right: 24px;
                                    
                                    @media (max-width: 576px) {
                                        width: 48px;
                                        height: 48px;
                                        margin-right: 16px;
                                    }
                                "></div>
                                <p style="
                                    margin: 0; 
                                    font-size: 16px; 
                                    color: ${theme.text_color || 'inherit'};
                                    
                                    @media (max-width: 576px) {
                                        font-size: 14px;
                                    }
                                ">${canvas1.description}</p>
                            </div>
                            <div style="flex-grow: 1;">
                                <h1 style="
                                    margin: 0; 
                                    font-size: 28px; 
                                    margin-bottom: 20px; 
                                    font-weight: 600; 
                                    color: ${theme.text_color || 'inherit'};
                                    
                                    @media (max-width: 768px) {
                                        font-size: 24px;
                                    }
                                    
                                    @media (max-width: 576px) {
                                        font-size: 22px;
                                        margin-bottom: 16px;
                                    }
                                ">${canvas1.title}</h1>
                                <h3 style="
                                    margin: 0; 
                                    font-size: 18px; 
                                    margin-bottom: 40px; 
                                    color: ${theme.text_color || 'inherit'};
                                    
                                    @media (max-width: 768px) {
                                        font-size: 16px;
                                    }
                                    
                                    @media (max-width: 576px) {
                                        margin-bottom: 30px;
                                        font-size: 15px;
                                    }
                                ">${canvas1.subtitle}</h3>
                                <button id="changeCanvas" style="
                                    padding: 20px 40px;
                                    ${buttonStyles}
                                    border: none;
                                    font-size: 18px;
                                    cursor: pointer;
                                    margin: 0 auto;
                                    margin-top: 10px;
                                    transition: all 0.2s ease;
                                    
                                    @media (max-width: 768px) {
                                        padding: 16px 32px;
                                        font-size: 16px;
                                    }
                                    
                                    @media (max-width: 576px) {
                                        width: 100%;
                                        padding: 14px;
                                        font-size: 15px;
                                    }
                                ">
                                    ${canvas1.button}
                                </button>
                            </div>
                            <div style="
                                display: flex; 
                                justify-content: space-between; 
                                align-items: flex-end;
                                
                                @media (max-width: 576px) {
                                    flex-direction: column;
                                    align-items: center;
                                    gap: 12px;
                                    margin-top: 20px;
                                }
                            ">
                                <div style="text-align: left;
                                    @media (max-width: 576px) {
                                        text-align: center;
                                    }">
                                    <p style="
                                        margin: 0; 
                                        font-size: 16px; 
                                        color: ${theme.text_color || 'inherit'};
                                        
                                        @media (max-width: 576px) {
                                            font-size: 14px;
                                        }
                                    ">${canvas1.tel}</p>
                                    <p style="
                                        margin: 8px 0 0; 
                                        font-size: 14px; 
                                        color: ${theme.text_color || 'inherit'};
                                        
                                        @media (max-width: 576px) {
                                            margin: 4px 0 0;
                                            font-size: 12px;
                                        }
                                    ">${canvas1.name}</p>
                                </div>
                                <a href="http://quizforbiz.ru" style="
                                    text-decoration: none; 
                                    font-size: 14px; 
                                    color: ${theme.text_color || 'inherit'};
                                    
                                    @media (max-width: 576px) {
                                        font-size: 12px;
                                    }
                                ">
                                    Создано в <span style="color: #105EFE;">Quiz for biz</span>
                                </a>
                            </div>
                        </div>
                    `}
                </div>
            `;
        }

        document.getElementById('changeCanvas').addEventListener('click', () => {
            STATUS(13);
            currentCanvas = 2;
            renderCanvas();
        });
    };

const renderAnswers = (container) => {
    const questionData = data.canvas2[currentIndex];
    const theme = data.theme;
    const totalQuestions = data.canvas2.length;
    const progressPercentage = ((currentIndex) / totalQuestions) * 100;
    STATUS(currentIndex + 1);

    // Определяем стиль кнопки (оригинальный код без изменений)
    const buttonStyle = theme.button_style || 'default';
    let buttonStyles = '';
    let answerStyles = '';

    switch(buttonStyle) {
        case 'rounded':
            buttonStyles = `
                border-radius: 50px;
                background-color: ${theme.button_color || '#105EFE'};
                color: ${theme.button_text_color || '#fff'};
            `;
            answerStyles = `
                border-radius: 50px;
                background: ${theme.background_color || 'inherit'};
                border: 1px solid #eee;
            `;
            break;
        case 'square':
            buttonStyles = `
                border-radius: 0;
                background-color: ${theme.button_color || '#105EFE'};
                color: ${theme.button_text_color || '#fff'};
            `;
            answerStyles = `
                border-radius: 0;
                background: ${theme.background_color || 'inherit'};
                border: 1px solid #eee;
            `;
            break;
        case 'outline':
            buttonStyles = `
                background: transparent;
                border: 2px solid ${theme.button_color || '#105EFE'};
                color: ${theme.button_color || '#105EFE'};
            `;
            answerStyles = `
                background: transparent;
                border: 2px solid ${theme.button_color || '#105EFE'};
                color: ${theme.button_color || '#105EFE'};
            `;
            break;
        case 'default':
        default:
            buttonStyles = `
                background-color: ${theme.button_color || '#105EFE'};
                color: ${theme.button_text_color || '#fff'};
                border-radius: 8px;
            `;
            answerStyles = `
                background: ${theme.background_color || 'inherit'};
                border: 1px solid #eee;
                border-radius: 8px;
            `;
    }

    container.innerHTML = `
        <div style="
            width: 100%; 
            height: 100%; 
            display: flex; 
            flex-direction: column; 
            padding: 40px; 
            box-sizing: border-box; 
            background-color: ${theme.background_color || 'inherit'};
        ">
            <div style="margin-bottom: 32px;">
                <h1 style="
                    margin: 0 0 16px 0; 
                    font-size: 28px; 
                    font-weight: 600; 
                    color: ${theme.text_color || 'inherit'};
                ">${questionData.question}</h1>
                <p style="
                    margin: 0; 
                    font-size: 18px; 
                    color: ${theme.text_color || 'inherit'};
                ">${questionData.description || ''}</p>
            </div>
            <div id="answers_for_quiz" style="
                flex: 1; 
                margin-bottom: 40px; 
                overflow-y: auto; 
                padding-right: 10px;
            "></div>
            <div style="
                display: flex; 
                justify-content: space-between; 
                align-items: center; 
                margin-top: auto;
            ">
                <div style="flex: 1; margin-right: 20px;">
                    <div style="
                        display: flex; 
                        justify-content: space-between; 
                        align-items: center; 
                        margin-bottom: 8px;
                    ">
                        <span style="
                            font-size: 16px; 
                            color: ${theme.text_color || 'inherit'};
                        ">Готово: <span style="color: ${theme.button_color || '#105EFE'};">${Math.round(progressPercentage)}%</span></span>
                    </div>
                    <div style="
                        width: 100%; 
                        height: 6px; 
                        background: #f0f0f0; 
                        border-radius: 3px;
                    ">
                        <div style="
                            width: ${progressPercentage}%; 
                            height: 100%; 
                            background: ${theme.button_color || '#105EFE'}; 
                            border-radius: 3px;
                        "></div>
                    </div>
                </div>
                <div style="
                    display: flex; 
                    align-items: center; 
                    gap: 12px;
                ">
                    <a href="http://quizforbiz.ru" style="
                        text-decoration: none; 
                        font-size: 14px; 
                        margin-right: 20px; 
                        color: ${theme.text_color || 'inherit'};
                    ">
                        Создано в <span style="color: #105EFE;">Quiz for biz</span>
                    </a>
                    <button id="qw-backButton" style="
                        width: 56px;
                        height: 56px;
                        padding: 0;
                        background: transparent;
                        border: 1px solid #ddd;
                        cursor: pointer;
                        display: ${currentIndex === 0 ? 'none' : 'flex'};
                        align-items: center;
                        justify-content: center;
                        border-radius: 8px;
                    ">
                        <img src="data:image/svg+xml;base64,${imgs.back}" alt="Назад" width="24" height="24" />
                    </button>
                    <button id="qw-nextButton" style="
                        padding: 0 40px;
                        height: 56px;
                        ${buttonStyles}
                        border: none;
                        font-size: 18px;
                        cursor: pointer;
                    ">
                        ${currentIndex < data.canvas2.length - 1 ? 'Далее' : 'Завершить'}
                    </button>
                </div>
            </div>
        </div>
    `;

    // Добавляем медиа-запросы только для мобильной адаптации
    const mobileStyles = `
        @media (max-width: 576px) {
            .quiz-container {
                padding: 20px !important;
            }
            .quiz-header h1 {
                font-size: 22px !important;
                margin-bottom: 12px !important;
            }
            .quiz-header p {
                font-size: 15px !important;
            }
            .progress-info {
                font-size: 14px !important;
            }
            .navigation-buttons {
                flex-direction: column-reverse !important;
                gap: 12px !important;
            }
            .button-group {
                width: 100% !important;
                justify-content: space-between !important;
            }
            #qw-backButton, #qw-nextButton {
                height: 48px !important;
            }
            #qw-backButton {
                width: 48px !important;
            }
            #qw-nextButton {
                flex-grow: 1 !important;
                padding: 0 16px !important;
                font-size: 16px !important;
                max-width: calc(100% - 60px) !important;
            }
            .qz-pro-link {
                display: none !important;
            }
            .mobile-qz-pro {
                display: block !important;
                text-align: center;
                margin-top: 8px;
                font-size: 12px !important;
            }
        }
    `;

    // Добавляем стили в head документа
    const styleElement = document.createElement('style');
    styleElement.innerHTML = mobileStyles;
    document.head.appendChild(styleElement);

    // Добавляем мобильную версию ссылки Quiz for biz
    const footer = container.querySelector('div > div:last-child');
    if (footer) {
        footer.insertAdjacentHTML('beforeend', `
            <div class="mobile-qz-pro" style="display: none;">
                <a href="http://quizforbiz.ru" style="
                    text-decoration: none; 
                    color: ${theme.text_color || 'inherit'};
                ">
                    Создано в <span style="color: #105EFE;">Quiz for biz</span>
                </a>
            </div>
        `);
    }

    // Добавляем классы для элементов, которые будем стилизовать
    container.querySelector('div').classList.add('quiz-container');
    container.querySelector('div > div:first-child').classList.add('quiz-header');
    container.querySelector('div > div:last-child').classList.add('navigation-container');
    container.querySelector('div > div:last-child > div:first-child').classList.add('progress-container');
    container.querySelector('div > div:last-child > div:last-child').classList.add('button-group');
    container.querySelector('div > div:last-child > div:last-child > a').classList.add('qz-pro-link');

    const renderQuiz = () => {
        const answersquiz = document.querySelector('#answers_for_quiz');
        const currentAnswers = userData.details.answers[currentIndex].answer;
        
        // Оригинальный код рендеринга вопросов без изменений
        switch (questionData.name) {
            case 'Answers':
                answersquiz.innerHTML = `
                    <div style="
                        display: grid; 
                        grid-template-columns: repeat(${isMobile ? 1 : 2}, 1fr); 
                        gap: 12px; 
                        width: 100%;
                    ">
                        ${questionData.answers.map((answer, index) => {
                            const isActive = currentAnswers.includes(answer);
                            const activeStyles = isActive ? `
                                border: 1px solid ${theme.button_color || '#105EFE'} !important;
                                background: rgba(${hexToRgb(theme.button_color || '#105EFE')}, 0.05) !important;
                            ` : '';
                            
                            return `
                                <div style="
                                    display: flex;
                                    align-items: center;
                                    padding: 16px;
                                    ${answerStyles}
                                    ${activeStyles}
                                    cursor: pointer;
                                    transition: all 0.2s ease;
                                    width: 100%;
                                    box-sizing: border-box;
                                ">
                                    <div style="
                                        width: 24px;
                                        height: 24px;
                                        border: 2px solid ${isActive ? theme.button_color || '#105EFE' : '#ddd'};
                                        background: ${isActive ? theme.button_color || '#105EFE' : 'transparent'};
                                        border-radius: ${questionData.multiple ? '4px' : '50%'};
                                        margin-right: 12px;
                                        display: flex;
                                        align-items: center;
                                        justify-content: center;
                                        flex-shrink: 0;
                                        transition: all 0.2s ease;
                                    ">
                                        ${isActive ? questionData.multiple ? 
                                            '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 12L10 17L20 7" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>' : 
                                            '<div style="width: 12px; height: 12px; background: white; border-radius: 50%;"></div>' : ''}
                                    </div>
                                    <p style="
                                        margin: 0; 
                                        font-size: 16px; 
                                        color: ${theme.text_color || 'inherit'}; 
                                        word-break: break-word;
                                    ">${answer}</p>
                                </div>
                            `;
                        }).join('')}
                    </div>
                `;
                break;
            case 'Calculator':
                const currentValue = currentAnswers[0] || questionData.min;
                answersquiz.innerHTML = `
                    <div style="
                        width: 100%; 
                        max-width: 600px; 
                        margin: 0 auto;
                    ">
                        <div style="
                            display: flex; 
                            justify-content: space-between; 
                            align-items: center; 
                            margin-bottom: 20px;
                        ">
                            <span style="
                                font-size: 16px; 
                                color: ${theme.text_color || 'inherit'};
                            ">${questionData.min}</span>
                            <span id="currentValueDisplay" style="
                                font-size: 32px; 
                                font-weight: bold; 
                                color: ${theme.button_color || '#105EFE'};
                            ">${currentValue}</span>
                            <span style="
                                font-size: 16px; 
                                color: ${theme.text_color || 'inherit'};
                            ">${questionData.max}</span>
                        </div>
                        <div style="
                            position: relative; 
                            width: 100%; 
                            height: 8px; 
                            background: #f0f0f0; 
                            border-radius: 4px; 
                            margin-bottom: 20px;
                        ">
                            <div id="progressBar" style="
                                position: absolute; 
                                height: 100%; 
                                background: ${theme.button_color || '#105EFE'}; 
                                border-radius: 4px; 
                                width: ${((currentValue - questionData.min) / (questionData.max - questionData.min)) * 100}%;
                            "></div>
                            <input 
                                type="range" 
                                id="range" 
                                min="${questionData.min}" 
                                max="${questionData.max}" 
                                step="${questionData.step}" 
                                value="${currentValue}"
                                style="
                                    position: absolute;
                                    width: 100%;
                                    height: 100%;
                                    opacity: 0;
                                    cursor: pointer;
                                "
                            />
                        </div>
                    </div>
                `;

                const rangeInput = document.getElementById('range');
                const progressBar = document.getElementById('progressBar');
                const currentValueDisplay = document.getElementById('currentValueDisplay');

                rangeInput.addEventListener('input', function() {
                    const value = this.value;
                    const percentage = ((value - questionData.min) / (questionData.max - questionData.min)) * 100;
                    
                    progressBar.style.width = `${percentage}%`;
                    currentValueDisplay.textContent = value;
                    currentAnswers[0] = value;
                });
                break;
            case 'AnswersImg':
            case 'AnswersAndImg':
                answersquiz.innerHTML = `
                   <style>
            /* === Жёсткая стилизация скроллбаров === */
            /* Для WebKit (Chrome, Safari, Edge) */
            .answers-container::-webkit-scrollbar {
                width: 8px !important;
                height: 8px !important;
            }
            .answers-container::-webkit-scrollbar-thumb {
                background: ${theme.button_color} !important;
                border-radius: 4px !important;
            }
            .answers-container::-webkit-scrollbar-track {
                background: transparent !important;
            }

            /* Для Firefox */
            .answers-container {
                scrollbar-width: thin !important;
                scrollbar-color: ${theme.button_color} transparent !important;
            }

            /* Для IE и старых Edge (если нужно) */
            .answers-container {
                -ms-overflow-style: none !important; /* Убирает стандартный скролл */
            }
            .answers-container::-webkit-scrollbar {
                -webkit-appearance: none !important; /* Отключает системный скролл */
            }

            /* === Остальные стили === */
            .answers-container {
                display: flex;
                overflow-x: auto;
                overflow-y: auto;
                padding: 12px 0;
                gap: 16px;
                min-height: 370px;
                height: auto !important;
                white-space: nowrap;
                scrollbar-gutter: stable; /* Фиксит прыгающий контент */
            }

            .image-answer-option {
                flex-shrink: 0;
                width: 360px;
                border: 2px solid #eaeaea;
                border-radius: 12px;
                overflow: hidden;
                cursor: pointer;
                transition: all 0.2s ease;
            }

            .image-answer-option[data-selected="true"] {
                border-color: ${theme.button_color};
            }

            .answer-checkbox {
                width: 20px;
                height: 20px;
                margin-right: 12px;
                border: 2px solid #ddd;
                border-radius: ${questionData.multiple ? '4px' : '50%'};
                display: flex;
                align-items: center;
                justify-content: center;
                background: transparent;
            }

            .answer-checkbox[data-selected="true"] {
                border-color: ${theme.button_color};
                background: ${theme.button_color};
            }
        </style>

                    <div class="answers-container">
                        ${questionData.answers.map((answer, index) => {
                            const isSelected = userData.details.answers[currentIndex].answer.includes(answer);
                            return `
                                <div class="image-answer-option" data-index="${index}" data-selected="${isSelected}">
                                    <div style="
                                        height: 285px; 
                                        display: flex; 
                                        align-items: center; 
                                        justify-content: center; 
                                        padding: 8px;
                                    ">
                                        <img src="${questionData.imgs[index]}" 
                                             alt="Answer image"
                                             style="
                                                 max-width: 100%; 
                                                 max-height: 100%; 
                                                 object-fit: contain; 
                                                 opacity: 0; 
                                                 transition: opacity 0.3s;
                                             "
                                             onload="this.style.opacity='1'"
                                             onerror="this.src='fallback-image.png'; this.style.opacity='1'"
                                             loading="lazy">
                                    </div>
                                    <div style="
                                        padding: 16px; 
                                        display: flex; 
                                        align-items: center;
                                    ">
                                        <div class="answer-checkbox" data-selected="${isSelected}">
                                            ${isSelected ? (questionData.multiple ? 
                                                '<svg width="12" height="12" viewBox="0 0 24 24"><path d="M5 12L10 17L20 7" stroke="white" stroke-width="2"/></svg>' : 
                                                '<div style="width:10px;height:10px;background:white;border-radius:50%"></div>') : ''}
                                        </div>
                                        <div style="
                                            font-size: 15px; 
                                            color: #333;
                                        ">${answer}</div>
                                    </div>
                                </div>
                            `;
                        }).join('')}
                    </div>
                `;

                document.querySelectorAll('.image-answer-option').forEach(option => {
                    option.addEventListener('click', function() {
                        const index = parseInt(this.getAttribute('data-index'));
                        const selectedAnswer = questionData.answers[index];
                        const currentAnswers = userData.details.answers[currentIndex].answer;
                        
                        if (questionData.multiple) {
                            const answerIndex = currentAnswers.indexOf(selectedAnswer);
                            if (answerIndex === -1) {
                                currentAnswers.push(selectedAnswer);
                            } else {
                                currentAnswers.splice(answerIndex, 1);
                            }
                        } else {
                            userData.details.answers[currentIndex].answer = [selectedAnswer];
                        }
                        
                        document.querySelectorAll('.image-answer-option').forEach((opt, idx) => {
                            const isSelected = userData.details.answers[currentIndex].answer.includes(questionData.answers[idx]);
                            opt.setAttribute('data-selected', isSelected);
                            opt.style.border = `2px solid ${isSelected ? theme.button_color : '#eaeaea'}`;
                            
                            const checkbox = opt.querySelector('.answer-checkbox');
                            checkbox.setAttribute('data-selected', isSelected);
                            checkbox.style.border = `2px solid ${isSelected ? theme.button_color : '#ddd'}`;
                            checkbox.style.background = isSelected ? theme.button_color : 'transparent';
                            checkbox.innerHTML = isSelected ? 
                                (questionData.multiple ? 
                                    '<svg width="12" height="12" viewBox="0 0 24 24"><path d="M5 12L10 17L20 7" stroke="white" stroke-width="2"/></svg>' : 
                                    '<div style="width:10px;height:10px;background:white;border-radius:50%"></div>') : 
                                '';
                        });
                    });
                });
                break;
        }

        // Оригинальные обработчики событий без изменений
        const answerElements = document.querySelectorAll('#answers_for_quiz > div > div');
        answerElements.forEach((element, index) => {
            element.addEventListener('click', () => {
                answer(index, questionData);
                
                const currentAnswers = userData.details.answers[currentIndex].answer;
                answerElements.forEach((el, idx) => {
                    const answerText = questionData.answers[idx];
                    const isActive = currentAnswers.includes(answerText);
                    
                    if (questionData.name === 'AnswersImg' || questionData.name === 'AnswersAndImg') {
                        el.style.border = isActive ? `1px solid ${theme.button_color || '#105EFE'}` : `1px solid #eee`;
                        el.style.background = isActive ? `rgba(${hexToRgb(theme.button_color || '#105EFE')}, 0.05)` : (theme.background_color || 'inherit');
                        
                        const indicator = el.querySelector('div > div[style*="border: 2px solid"]');
                        if (indicator) {
                            indicator.style.border = `2px solid ${isActive ? theme.button_color || '#105EFE' : '#ddd'}`;
                            indicator.style.background = isActive ? theme.button_color || '#105EFE' : 'transparent';
                            indicator.innerHTML = isActive ? 
                                questionData.multiple ? 
                                    '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 12L10 17L20 7" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>' : 
                                    '<div style="width: 12px; height: 12px; background: white; border-radius: 50%;"></div>' : 
                                '';
                        }
                    } else {
                        el.style.border = isActive ? `1px solid ${theme.button_color || '#105EFE'}` : `1px solid #eee`;
                        el.style.background = isActive ? `rgba(${hexToRgb(theme.button_color || '#105EFE')}, 0.05)` : (theme.background_color || 'inherit');
                        
                        const indicator = el.querySelector('div[style*="border: 2px solid"]');
                        if (indicator) {
                            indicator.style.border = `2px solid ${isActive ? theme.button_color || '#105EFE' : '#ddd'}`;
                            indicator.style.background = isActive ? theme.button_color || '#105EFE' : 'transparent';
                            indicator.innerHTML = isActive ? 
                                questionData.multiple ? 
                                    '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 12L10 17L20 7" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>' : 
                                    '<div style="width: 12px; height: 12px; background: white; border-radius: 50%;"></div>' : 
                                '';
                        }
                    }
                });
            });
        });

        if (questionData.name === 'Calculator') {
            const rangeInput = document.getElementById('range');
            const valueDisplay = document.querySelector('#answers_for_quiz > div > div > span:nth-child(2)');
            
            rangeInput.addEventListener('input', () => {
                const value = rangeInput.value;
                valueDisplay.textContent = value;
                userData.details.answers[currentIndex].answer = [value];
            });
        }
    };

    renderQuiz();

    // Оригинальные обработчики кнопок без изменений
    document.getElementById('qw-nextButton').addEventListener('click', () => {
        if (userData.details.answers[currentIndex].answer.length > 0 || 
            (questionData.name === 'Calculator' && userData.details.answers[currentIndex].answer[0] !== undefined)) {
            if (currentIndex < data.canvas2.length - 1) {
                currentIndex++;
                renderAnswers(container);
            } else {
                currentCanvas = 3;
                renderCanvas();
            }
        }
    });

    document.getElementById('qw-backButton').addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            renderAnswers(container);
        }
    });
};

 const renderCanvas3 = (container) => {
    const { canvas3 } = data;
    const theme = data.theme;
    const alignType = canvas3.aling || 'canvas';
    
    // Определяем стиль кнопки
    const buttonStyle = theme.button_style || 'default';
    let buttonStyles = '';
    
    switch(buttonStyle) {
        case 'rounded':
            buttonStyles = `
                border-radius: 50px;
                background-color: ${theme.button_color || '#105EFE'};
                color: ${theme.button_text_color || '#fff'};
            `;
            break;
        case 'square':
            buttonStyles = `
                border-radius: 0;
                background-color: ${theme.button_color || '#105EFE'};
                color: ${theme.button_text_color || '#fff'};
            `;
            break;
        case 'outline':
            buttonStyles = `
                background: transparent;
                border: 2px solid ${theme.button_color || '#105EFE'};
                color: ${theme.button_color || '#105EFE'};
            `;
            break;
        case 'default':
        default:
            buttonStyles = `
                background-color: ${theme.button_color || '#105EFE'};
                color: ${theme.button_text_color || '#fff'};
                border-radius: 8px;
            `;
    }
    
    if (alignType.includes('background')) {
        // Фоновый стиль с адаптацией
        const backgroundStyle = canvas3.video || canvas3.img ? '' : `background-color: ${theme.background_color || '#fff'};`;

        container.innerHTML = `
            <div style="
                width: 100%;
                height: 100%;
                position: relative;
                overflow: hidden;
                ${backgroundStyle}
            ">
                ${canvas3.video ? `
                <video 
                    loop 
                    autoplay 
                    muted 
                    playsinline
                    style="
                        position: absolute;
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                    "
                >
                    <source src="${canvas3.video}" type="video/mp4">
                </video>
                ` : canvas3.img ? `
                <img 
                    src="${canvas3.img}" 
                    style="
                        position: absolute;
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                    "
                    alt="Фоновое изображение"
                >
                ` : ''}
                
                <div style="
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    padding: 20px;
                    box-sizing: border-box;
                    
                    @media (max-width: 576px) {
                        padding: 15px;
                    }
                ">
                    <div style="
                        width: 100%;
                        max-width: 500px;
                        text-align: center;
                        padding: 30px;
                        background: transparent;
                        border-radius: 12px;
                        
                        @media (max-width: 768px) {
                            padding: 25px;
                        }
                        
                        @media (max-width: 576px) {
                            padding: 20px;
                            max-width: 100%;
                        }
                    ">
                        <!-- Заголовок и подзаголовок -->
                        <div style="margin-bottom: 30px;
                            @media (max-width: 576px) {
                                margin-bottom: 20px;
                            }">
                            <h1 style="
                                margin: 0 0 10px 0; 
                                font-size: 26px; 
                                font-weight: 600; 
                                color: ${theme.text_color || '#333'};
                                
                                @media (max-width: 768px) {
                                    font-size: 24px;
                                }
                                
                                @media (max-width: 576px) {
                                    font-size: 22px;
                                }
                            ">${canvas3.title}</h1>
                            <p style="
                                margin: 0; 
                                font-size: 16px; 
                                color: ${theme.text_color || '#555'};
                                
                                @media (max-width: 576px) {
                                    font-size: 15px;
                                }
                            ">${canvas3.subtitle}</p>
                        </div>
                        
                        ${canvas3.name ? `
                        <div style="
                            margin-bottom: 20px; 
                            display: flex; 
                            flex-direction: column; 
                            align-items: center;
                        ">
                            <label style="
                                display: block; 
                                margin-bottom: 6px; 
                                font-size: 14px; 
                                color: ${theme.text_color || '#333'}; 
                                text-align: left; 
                                width: 100%; 
                                max-width: 300px;
                                
                                @media (max-width: 576px) {
                                    font-size: 13px;
                                }
                            ">Имя*</label>
                            <div style="position: relative; width: 100%; max-width: 300px;">
                                <input type="text" id="userName" placeholder="Иван" style="
                                    width: 100%;
                                    padding: 14px 14px 14px 42px;
                                    border: 1px solid #ddd;
                                    font-size: 15px;
                                    border-radius: 8px;
                                    color: ${theme.text_color || '#333'};
                                    background-color: white;
                                    
                                    @media (max-width: 576px) {
                                        padding: 12px 12px 12px 38px;
                                        font-size: 14px;
                                    }
                                ">
                                <img src="data:image/svg+xml;base64,${imgs.person}" alt="Имя" style="
                                    position: absolute;
                                    left: 14px;
                                    top: 50%;
                                    transform: translateY(-50%);
                                    width: 18px;
                                    height: 18px;
                                    opacity: 0.7;
                                    
                                    @media (max-width: 576px) {
                                        left: 12px;
                                        width: 16px;
                                        height: 16px;
                                    }
                                ">
                            </div>
                        </div>
                        ` : ''}
                        
                        ${canvas3.email ? `
                        <div style="
                            margin-bottom: 20px; 
                            display: flex; 
                            flex-direction: column; 
                            align-items: center;
                        ">
                            <label style="
                                display: block; 
                                margin-bottom: 6px; 
                                font-size: 14px; 
                                color: ${theme.text_color || '#333'}; 
                                text-align: left; 
                                width: 100%; 
                                max-width: 300px;
                                
                                @media (max-width: 576px) {
                                    font-size: 13px;
                                }
                            ">Email*</label>
                            <div style="position: relative; width: 100%; max-width: 300px;">
                                <input type="email" id="userEmail" placeholder="Mail@example.com" style="
                                    width: 100%;
                                    padding: 14px 14px 14px 42px;
                                    border: 1px solid #ddd;
                                    font-size: 15px;
                                    border-radius: 8px;
                                    color: ${theme.text_color || '#333'};
                                    background-color: white;
                                    
                                    @media (max-width: 576px) {
                                        padding: 12px 12px 12px 38px;
                                        font-size: 14px;
                                    }
                                ">
                                <img src="data:image/svg+xml;base64,${imgs.email}" alt="Email" style="
                                    position: absolute;
                                    left: 14px;
                                    top: 50%;
                                    transform: translateY(-50%);
                                    width: 18px;
                                    height: 18px;
                                    opacity: 0.7;
                                    
                                    @media (max-width: 576px) {
                                        left: 12px;
                                        width: 16px;
                                        height: 16px;
                                    }
                                ">
                            </div>
                        </div>
                        ` : ''}
                        
                        ${canvas3.phone ? `
                        <div style="
                            margin-bottom: 30px; 
                            display: flex; 
                            flex-direction: column; 
                            align-items: center;
                        ">
                            <label style="
                                display: block; 
                                margin-bottom: 6px; 
                                font-size: 14px; 
                                color: ${theme.text_color || '#333'}; 
                                text-align: left; 
                                width: 100%; 
                                max-width: 300px;
                                
                                @media (max-width: 576px) {
                                    font-size: 13px;
                                }
                            ">Телефон*</label>
                            <div style="position: relative; width: 100%; max-width: 300px;">
                                <input type="tel" id="userTel" placeholder="+7 (900) 000-00-00" style="
                                    width: 100%;
                                    padding: 14px 14px 14px 42px;
                                    border: 1px solid #ddd;
                                    font-size: 15px;
                                    border-radius: 8px;
                                    color: ${theme.text_color || '#333'};
                                    background-color: white;
                                    
                                    @media (max-width: 576px) {
                                        padding: 12px 12px 12px 38px;
                                        font-size: 14px;
                                    }
                                ">
                                <img src="data:image/svg+xml;base64,${imgs.phone}" alt="Телефон" style="
                                    position: absolute;
                                    left: 14px;
                                    top: 50%;
                                    transform: translateY(-50%);
                                    width: 18px;
                                    height: 18px;
                                    opacity: 0.7;
                                    
                                    @media (max-width: 576px) {
                                        left: 12px;
                                        width: 16px;
                                        height: 16px;
                                    }
                                ">
                            </div>
                        </div>
                        ` : ''}
                        
                        <div style="
                            display: flex; 
                            justify-content: center; 
                            gap: 10px; 
                            margin-bottom: 20px; 
                            flex-wrap: wrap;
                            
                            @media (max-width: 576px) {
                                gap: 8px;
                            }
                        ">
                            <button id="sendForm" style="
                                padding: 0 36px;
                                height: 48px;
                                ${buttonStyles}
                                border: none;
                                font-size: 16px;
                                cursor: pointer;
                                transition: all 0.2s ease;
                                border-radius: 8px;
                                
                                @media (max-width: 576px) {
                                    width: 100%;
                                    height: 44px;
                                    font-size: 15px;
                                }
                            ">
                                Отправить
                            </button>
                            <button id="handleBack" style="
                                padding: 0 24px;
                                height: 48px;
                                background: transparent;
                                border: 1px solid #ddd;
                                font-size: 16px;
                                cursor: pointer;
                                border-radius: 8px;
                                color: ${theme.text_color || '#333'};
                                
                                @media (max-width: 576px) {
                                    width: 100%;
                                    height: 44px;
                                    font-size: 15px;
                                }
                            ">
                                Назад
                            </button>
                        </div>
                    </div>
                    
                    <div style="
                        margin-top: 20px;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        width: 100%;
                    ">
                        <a href="http://quizforbiz.ru" style="
                            text-decoration: none; 
                            font-size: 13px; 
                            color: ${theme.text_color || '#777'};
                            
                            @media (max-width: 576px) {
                                font-size: 12px;
                            }
                        ">
                            Создано в <span style="color: ${theme.button_color || '#105EFE'};">Quiz for biz</span>
                        </a>
                    </div>
                </div>
            </div>
        `;
    } else {
            // Стандартный стиль с адаптацией
            const imageDisplayStyle = theme.image_display || 'cover';
            const imagePosition = theme.image_position || 'left';
            
            container.innerHTML = `
                <div style="
                    display: flex; 
                    width: 100%; 
                    height: 100%; 
                    flex-direction: ${isMobile ? 'column' : 'row'}; 
                    background-color: ${theme.background_color || 'inherit'};
                    
                    @media (max-width: 576px) {
                        flex-direction: column;
                        overflow-y: auto;
                    }
                ">
                    ${imagePosition === 'right' ? 
                        `<div style="
                            ${isMobile ? 'width: 100%; padding: 20px;' : 'width: 50%; padding: 40px;'} 
                            display: flex; 
                            flex-direction: column; 
                            justify-content: center; 
                            box-sizing: border-box; 
                            position: relative; 
                            background-color: ${theme.background_color || 'inherit'};
                            
                            @media (max-width: 768px) {
                                padding: 30px;
                            }
                            
                            @media (max-width: 576px) {
                                width: 100%;
                                padding: 20px;
                                order: 2;
                            }
                        ">
                            <div style="margin-bottom: 40px;
                                @media (max-width: 576px) {
                                    margin-bottom: 30px;
                                }">
                                <h1 style="
                                    margin: 0 0 12px 0; 
                                    font-size: ${isMobile ? '24px' : '28px'}; 
                                    font-weight: 600; 
                                    color: ${theme.text_color || 'inherit'};
                                    
                                    @media (max-width: 576px) {
                                        font-size: 22px;
                                        margin-bottom: 10px;
                                    }
                                ">${canvas3.title}</h1>
                                <p style="
                                    margin: 0; 
                                    font-size: ${isMobile ? '16px' : '18px'}; 
                                    color: ${theme.text_color || 'inherit'};
                                    
                                    @media (max-width: 576px) {
                                        font-size: 15px;
                                    }
                                ">${canvas3.subtitle}</p>
                            </div>
                            ${canvas3.name ? `
                            <div style="margin-bottom: 24px;
                                @media (max-width: 576px) {
                                    margin-bottom: 20px;
                                }">
                                <label style="
                                    display: block; 
                                    margin-bottom: 8px; 
                                    font-size: 16px; 
                                    color: ${theme.text_color || 'inherit'};
                                    
                                    @media (max-width: 576px) {
                                        font-size: 14px;
                                        margin-bottom: 6px;
                                    }
                                ">Имя*</label>
                                <div style="position: relative;">
                                    <input type="text" id="userName" placeholder="Иван" style="
                                        width: 100%;
                                        max-width: 300px;
                                        padding: 16px 16px 16px 48px;
                                        border: 1px solid #ddd;
                                        font-size: 16px;
                                        border-radius: 8px;
                                        color: ${theme.text_color || 'inherit'};
                                        background-color: ${theme.background_color || 'inherit'};
                                        
                                        @media (max-width: 768px) {
                                            padding: 14px 14px 14px 42px;
                                        }
                                        
                                        @media (max-width: 576px) {
                                            max-width: 100%;
                                            padding: 12px 12px 12px 38px;
                                            font-size: 14px;
                                        }
                                    ">
                                    <img src="data:image/svg+xml;base64,${imgs.person}" alt="Имя" style="
                                        position: absolute;
                                        left: 16px;
                                        top: 50%;
                                        transform: translateY(-50%);
                                        width: 20px;
                                        height: 20px;
                                        
                                        @media (max-width: 768px) {
                                            left: 14px;
                                            width: 18px;
                                            height: 18px;
                                        }
                                        
                                        @media (max-width: 576px) {
                                            left: 12px;
                                            width: 16px;
                                            height: 16px;
                                        }
                                    ">
                                </div>
                            </div>
                            ` : ''}
                            ${canvas3.email ? `
                            <div style="margin-bottom: 24px;
                                @media (max-width: 576px) {
                                    margin-bottom: 20px;
                                }">
                                <label style="
                                    display: block; 
                                    margin-bottom: 8px; 
                                    font-size: 16px; 
                                    color: ${theme.text_color || 'inherit'};
                                    
                                    @media (max-width: 576px) {
                                        font-size: 14px;
                                        margin-bottom: 6px;
                                    }
                                ">Email*</label>
                                <div style="position: relative;">
                                    <input type="email" id="userEmail" placeholder="Mail@example.com" style="
                                        width: 100%;
                                        max-width: 300px;
                                        padding: 16px 16px 16px 48px;
                                        border: 1px solid #ddd;
                                        font-size: 16px;
                                        border-radius: 8px;
                                        color: ${theme.text_color || 'inherit'};
                                        background-color: ${theme.background_color || 'inherit'};
                                        
                                        @media (max-width: 768px) {
                                            padding: 14px 14px 14px 42px;
                                        }
                                        
                                        @media (max-width: 576px) {
                                            max-width: 100%;
                                            padding: 12px 12px 12px 38px;
                                            font-size: 14px;
                                        }
                                    ">
                                    <img src="data:image/svg+xml;base64,${imgs.email}" alt="Email" style="
                                        position: absolute;
                                        left: 16px;
                                        top: 50%;
                                        transform: translateY(-50%);
                                        width: 20px;
                                        height: 20px;
                                        
                                        @media (max-width: 768px) {
                                            left: 14px;
                                            width: 18px;
                                            height: 18px;
                                        }
                                        
                                        @media (max-width: 576px) {
                                            left: 12px;
                                            width: 16px;
                                            height: 16px;
                                        }
                                    ">
                                </div>
                            </div>
                            ` : ''}
                            ${canvas3.phone ? `
                            <div style="margin-bottom: 40px;
                                @media (max-width: 576px) {
                                    margin-bottom: 30px;
                                }">
                                <label style="
                                    display: block; 
                                    margin-bottom: 8px; 
                                    font-size: 16px; 
                                    color: ${theme.text_color || 'inherit'};
                                    
                                    @media (max-width: 576px) {
                                        font-size: 14px;
                                        margin-bottom: 6px;
                                    }
                                ">Телефон*</label>
                                <div style="position: relative;">
                                    <input type="tel" id="userTel" placeholder="+7 (900) 000-00-00" style="
                                        width: 100%;
                                        max-width: 300px;
                                        padding: 16px 16px 16px 48px;
                                        border: 1px solid #ddd;
                                        font-size: 16px;
                                        border-radius: 8px;
                                        color: ${theme.text_color || 'inherit'};
                                        background-color: ${theme.background_color || 'inherit'};
                                        
                                        @media (max-width: 768px) {
                                            padding: 14px 14px 14px 42px;
                                        }
                                        
                                        @media (max-width: 576px) {
                                            max-width: 100%;
                                            padding: 12px 12px 12px 38px;
                                            font-size: 14px;
                                        }
                                    ">
                                    <img src="data:image/svg+xml;base64,${imgs.phone}" alt="Телефон" style="
                                        position: absolute;
                                        left: 16px;
                                        top: 50%;
                                        transform: translateY(-50%);
                                        width: 20px;
                                        height: 20px;
                                        
                                        @media (max-width: 768px) {
                                            left: 14px;
                                            width: 18px;
                                            height: 18px;
                                        }
                                        
                                        @media (max-width: 576px) {
                                            left: 12px;
                                            width: 16px;
                                            height: 16px;
                                        }
                                    ">
                                </div>
                            </div>
                            ` : ''}
                            <div style="
                                display: flex; 
                                justify-content: flex-start; 
                                gap: 12px; 
                                margin-bottom: 40px; 
                                flex-wrap: wrap;
                                
                                @media (max-width: 576px) {
                                    justify-content: center;
                                    margin-bottom: 30px;
                                }
                            ">
                                <button id="sendForm" style="
                                    padding: 0 40px;
                                    height: 56px;
                                    ${buttonStyles}
                                    border: none;
                                    font-size: 18px;
                                    cursor: pointer;
                                    transition: all 0.2s ease;
                                    
                                    @media (max-width: 768px) {
                                        padding: 0 32px;
                                        height: 52px;
                                        font-size: 16px;
                                    }
                                    
                                    @media (max-width: 576px) {
                                        width: 100%;
                                        height: 48px;
                                        padding: 0;
                                        font-size: 15px;
                                    }
                                ">
                                    Отправить
                                </button>
                                <button id="handleBack" style="
                                    padding: 0 24px;
                                    height: 56px;
                                    background: transparent;
                                    border: 1px solid #ddd;
                                    font-size: 18px;
                                    cursor: pointer;
                                    border-radius: 8px;
                                    color: ${theme.text_color || 'inherit'};
                                    
                                    @media (max-width: 768px) {
                                        padding: 0 20px;
                                        height: 52px;
                                        font-size: 16px;
                                    }
                                    
                                    @media (max-width: 576px) {
                                        width: 100%;
                                        height: 48px;
                                        padding: 0;
                                        font-size: 15px;
                                    }
                                ">
                                    Назад
                                </button>
                            </div>
                            <div style="
                                position: ${isMobile ? 'static' : 'absolute'}; 
                                ${isMobile ? 'margin-top: 20px;' : ''} 
                                bottom: 40px; 
                                right: 40px;
                                
                                @media (max-width: 576px) {
                                    position: static;
                                    margin-top: 20px;
                                    text-align: center;
                                }
                            ">
                                <a href="http://quizforbiz.ru" style="
                                    text-decoration: none; 
                                    font-size: 14px; 
                                    color: ${theme.text_color || 'inherit'};
                                    
                                    @media (max-width: 576px) {
                                        font-size: 12px;
                                    }
                                ">
                                    Создано в <span style="color: #105EFE;">Quiz for biz</span>
                                </a>
                            </div>
                        </div>
                        ${canvas3.video ? `
                            <div style="
                                ${isMobile ? 'width: 100%; height: 200px;' : 'width: 50%; height: 100%;'} 
                                padding: 20px; 
                                box-sizing: border-box; 
                                display: flex; 
                                align-items: center; 
                                justify-content: center;
                                
                                @media (max-width: 576px) {
                                    order: 1;
                                    height: 180px;
                                    padding: 10px 20px;
                                }
                            ">
                                <video 
                                    loop 
                                    autoplay 
                                    muted 
                                    playsinline
                                    style="
                                        width: 100%; 
                                        height: 100%; 
                                        object-fit: ${imageDisplayStyle === 'contain' ? 'contain' : 'cover'}; 
                                        border-radius: 16px;
                                    "
                                >
                                    <source src="${canvas3.video}" type="video/mp4">
                                </video>
                            </div>
                        ` : `
                            <div style="
                                ${isMobile ? 'width: 100%; height: 200px;' : 'width: 50%; height: 100%;'} 
                                padding: 20px; 
                                box-sizing: border-box; 
                                display: flex; 
                                align-items: center; 
                                justify-content: center; 
                                background-color: ${imageDisplayStyle === 'color' ? theme.background_color : 'transparent'};
                                
                                @media (max-width: 576px) {
                                    order: 1;
                                    height: 180px;
                                    padding: 10px 20px;
                                }
                            ">
                                <div style="
                                    width: 100%;
                                    height: 100%;
                                    background: ${imageDisplayStyle === 'color' ? 'none' : `url(${canvas3.img})`} 
                                    no-repeat center center/${imageDisplayStyle === 'contain' ? 'contain' : 'cover'};
                                    border-radius: 16px;
                                "></div>
                            </div>
                        `}` : 
                        `${canvas3.video ? `
                            <div style="
                                ${isMobile ? 'width: 100%; height: 200px;' : 'width: 50%; height: 100%;'} 
                                padding: 20px; 
                                box-sizing: border-box; 
                                display: flex; 
                                align-items: center; 
                                justify-content: center;
                                
                                @media (max-width: 576px) {
                                    height: 180px;
                                    padding: 10px 20px;
                                }
                            ">
                                <video 
                                    loop 
                                    autoplay 
                                    muted 
                                    playsinline
                                    style="
                                        width: 100%; 
                                        height: 100%; 
                                        object-fit: ${imageDisplayStyle === 'contain' ? 'contain' : 'cover'}; 
                                        border-radius: 16px;
                                    "
                                >
                                    <source src="${canvas3.video}" type="video/mp4">
                                </video>
                            </div>
                        ` : `
                            <div style="
                                ${isMobile ? 'width: 100%; height: 200px;' : 'width: 50%; height: 100%;'} 
                                padding: 20px; 
                                box-sizing: border-box; 
                                display: flex; 
                                align-items: center; 
                                justify-content: center; 
                                background-color: ${imageDisplayStyle === 'color' ? theme.background_color : 'transparent'};
                                
                                @media (max-width: 576px) {
                                    height: 180px;
                                    padding: 10px 20px;
                                }
                            ">
                                <div style="
                                    width: 100%;
                                    height: 100%;
                                    background: ${imageDisplayStyle === 'color' ? 'none' : `url(${canvas3.img})`} 
                                    no-repeat center center/${imageDisplayStyle === 'contain' ? 'contain' : 'cover'};
                                    border-radius: 16px;
                                "></div>
                            </div>
                        `}
                        <div style="
                            ${isMobile ? 'width: 100%; padding: 20px;' : 'width: 50%; padding: 40px;'} 
                            display: flex; 
                            flex-direction: column; 
                            justify-content: center; 
                            box-sizing: border-box; 
                            position: relative; 
                            background-color: ${theme.background_color || 'inherit'};
                            
                            @media (max-width: 768px) {
                                padding: 30px;
                            }
                            
                            @media (max-width: 576px) {
                                padding: 20px;
                            }
                        ">
                            <div style="margin-bottom: 40px;
                                @media (max-width: 576px) {
                                    margin-bottom: 30px;
                                }">
                                <h1 style="
                                    margin: 0 0 12px 0; 
                                    font-size: ${isMobile ? '24px' : '28px'}; 
                                    font-weight: 600; 
                                    color: ${theme.text_color || 'inherit'};
                                    
                                    @media (max-width: 576px) {
                                        font-size: 22px;
                                        margin-bottom: 10px;
                                    }
                                ">${canvas3.title}</h1>
                                <p style="
                                    margin: 0; 
                                    font-size: ${isMobile ? '16px' : '18px'}; 
                                    color: ${theme.text_color || 'inherit'};
                                    
                                    @media (max-width: 576px) {
                                        font-size: 15px;
                                    }
                                ">${canvas3.subtitle}</p>
                            </div>
                            ${canvas3.name ? `
                            <div style="margin-bottom: 24px;
                                @media (max-width: 576px) {
                                    margin-bottom: 20px;
                                }">
                                <label style="
                                    display: block; 
                                    margin-bottom: 8px; 
                                    font-size: 16px; 
                                    color: ${theme.text_color || 'inherit'};
                                    
                                    @media (max-width: 576px) {
                                        font-size: 14px;
                                        margin-bottom: 6px;
                                    }
                                ">Имя*</label>
                                <div style="position: relative;">
                                    <input type="text" id="userName" placeholder="Иван" style="
                                        width: 100%;
                                        max-width: 300px;
                                        padding: 16px 16px 16px 48px;
                                        border: 1px solid #ddd;
                                        font-size: 16px;
                                        border-radius: 8px;
                                        color: ${theme.text_color || 'inherit'};
                                        background-color: ${theme.background_color || 'inherit'};
                                        
                                        @media (max-width: 768px) {
                                            padding: 14px 14px 14px 42px;
                                        }
                                        
                                        @media (max-width: 576px) {
                                            max-width: 100%;
                                            padding: 12px 12px 12px 38px;
                                            font-size: 14px;
                                        }
                                    ">
                                    <img src="data:image/svg+xml;base64,${imgs.person}" alt="Имя" style="
                                        position: absolute;
                                        left: 16px;
                                        top: 50%;
                                        transform: translateY(-50%);
                                        width: 20px;
                                        height: 20px;
                                        
                                        @media (max-width: 768px) {
                                            left: 14px;
                                            width: 18px;
                                            height: 18px;
                                        }
                                        
                                        @media (max-width: 576px) {
                                            left: 12px;
                                            width: 16px;
                                            height: 16px;
                                        }
                                    ">
                                </div>
                            </div>
                            ` : ''}
                            ${canvas3.email ? `
                            <div style="margin-bottom: 24px;
                                @media (max-width: 576px) {
                                    margin-bottom: 20px;
                                }">
                                <label style="
                                    display: block; 
                                    margin-bottom: 8px; 
                                    font-size: 16px; 
                                    color: ${theme.text_color || 'inherit'};
                                    
                                    @media (max-width: 576px) {
                                        font-size: 14px;
                                        margin-bottom: 6px;
                                    }
                                ">Email*</label>
                                <div style="position: relative;">
                                    <input type="email" id="userEmail" placeholder="Mail@example.com" style="
                                        width: 100%;
                                        max-width: 300px;
                                        padding: 16px 16px 16px 48px;
                                        border: 1px solid #ddd;
                                        font-size: 16px;
                                        border-radius: 8px;
                                        color: ${theme.text_color || 'inherit'};
                                        background-color: ${theme.background_color || 'inherit'};
                                        
                                        @media (max-width: 768px) {
                                            padding: 14px 14px 14px 42px;
                                        }
                                        
                                        @media (max-width: 576px) {
                                            max-width: 100%;
                                            padding: 12px 12px 12px 38px;
                                            font-size: 14px;
                                        }
                                    ">
                                    <img src="data:image/svg+xml;base64,${imgs.email}" alt="Email" style="
                                        position: absolute;
                                        left: 16px;
                                        top: 50%;
                                        transform: translateY(-50%);
                                        width: 20px;
                                        height: 20px;
                                        
                                        @media (max-width: 768px) {
                                            left: 14px;
                                            width: 18px;
                                            height: 18px;
                                        }
                                        
                                        @media (max-width: 576px) {
                                            left: 12px;
                                            width: 16px;
                                            height: 16px;
                                        }
                                    ">
                                </div>
                            </div>
                            ` : ''}
                            ${canvas3.phone ? `
                            <div style="margin-bottom: 40px;
                                @media (max-width: 576px) {
                                    margin-bottom: 30px;
                                }">
                                <label style="
                                    display: block; 
                                    margin-bottom: 8px; 
                                    font-size: 16px; 
                                    color: ${theme.text_color || 'inherit'};
                                    
                                    @media (max-width: 576px) {
                                        font-size: 14px;
                                        margin-bottom: 6px;
                                    }
                                ">Телефон*</label>
                                <div style="position: relative;">
                                    <input type="tel" id="userTel" placeholder="+7 (900) 000-00-00" style="
                                        width: 100%;
                                        max-width: 300px;
                                        padding: 16px 16px 16px 48px;
                                        border: 1px solid #ddd;
                                        font-size: 16px;
                                        border-radius: 8px;
                                        color: ${theme.text_color || 'inherit'};
                                        background-color: ${theme.background_color || 'inherit'};
                                        
                                        @media (max-width: 768px) {
                                            padding: 14px 14px 14px 42px;
                                        }
                                        
                                        @media (max-width: 576px) {
                                            max-width: 100%;
                                            padding: 12px 12px 12px 38px;
                                            font-size: 14px;
                                        }
                                    ">
                                    <img src="data:image/svg+xml;base64,${imgs.phone}" alt="Телефон" style="
                                        position: absolute;
                                        left: 16px;
                                        top: 50%;
                                        transform: translateY(-50%);
                                        width: 20px;
                                        height: 20px;
                                        
                                        @media (max-width: 768px) {
                                            left: 14px;
                                            width: 18px;
                                            height: 18px;
                                        }
                                        
                                        @media (max-width: 576px) {
                                            left: 12px;
                                            width: 16px;
                                            height: 16px;
                                        }
                                    ">
                                </div>
                            </div>
                            ` : ''}
                            <div style="
                                display: flex; 
                                justify-content: flex-start; 
                                gap: 12px; 
                                margin-bottom: 40px; 
                                flex-wrap: wrap;
                                
                                @media (max-width: 576px) {
                                    justify-content: center;
                                    margin-bottom: 30px;
                                }
                            ">
                                <button id="sendForm" style="
                                    padding: 0 40px;
                                    height: 56px;
                                    ${buttonStyles}
                                    border: none;
                                    font-size: 18px;
                                    cursor: pointer;
                                    transition: all 0.2s ease;
                                    
                                    @media (max-width: 768px) {
                                        padding: 0 32px;
                                        height: 52px;
                                        font-size: 16px;
                                    }
                                    
                                    @media (max-width: 576px) {
                                        width: 100%;
                                        height: 48px;
                                        padding: 0;
                                        font-size: 15px;
                                    }
                                ">
                                    Отправить
                                </button>
                                <button id="handleBack" style="
                                    padding: 0 24px;
                                    height: 56px;
                                    background: transparent;
                                    border: 1px solid #ddd;
                                    font-size: 18px;
                                    cursor: pointer;
                                    border-radius: 8px;
                                    color: ${theme.text_color || 'inherit'};
                                    
                                    @media (max-width: 768px) {
                                        padding: 0 20px;
                                        height: 52px;
                                        font-size: 16px;
                                    }
                                    
                                    @media (max-width: 576px) {
                                        width: 100%;
                                        height: 48px;
                                        padding: 0;
                                        font-size: 15px;
                                    }
                                ">
                                    Назад
                                </button>
                            </div>
                            <div style="
                                position: ${isMobile ? 'static' : 'absolute'}; 
                                ${isMobile ? 'margin-top: 20px;' : ''} 
                                bottom: 40px; 
                                right: 40px;
                                
                                @media (max-width: 576px) {
                                    position: static;
                                    margin-top: 20px;
                                    text-align: center;
                                }
                            ">
                                <a href="http://quizforbiz.ru" style="
                                    text-decoration: none; 
                                    font-size: 14px; 
                                    color: ${theme.text_color || 'inherit'};
                                    
                                    @media (max-width: 576px) {
                                        font-size: 12px;
                                    }
                                ">
                                    Создано в <span style="color: #105EFE;">Quiz for biz</span>
                                </a>
                            </div>
                        </div>
                    `}
                </div>
            `;
        }

      const backButton = document.getElementById('handleBack');
if (backButton) {
  backButton.addEventListener('click', () => {
    currentCanvas = 2;
    renderCanvas();
  });
}

        document.getElementById('sendForm').addEventListener('click', async () => {
            userData.name = canvas3.name ? document.getElementById('userName').value : null;
            userData.email = canvas3.email ? document.getElementById('userEmail').value : null;
            userData.phone = canvas3.phone ? document.getElementById('userTel').value : null;

            let isNameFilled = canvas3.name ? (userData.name && userData.name.trim() !== '') : true;
            let isEmailFilled = canvas3.email ? (userData.email && userData.email.trim() !== '') : true;
            let isPhoneFilled = canvas3.phone ? (userData.phone && userData.phone.trim() !== '') : true;

            if (isNameFilled && isEmailFilled && isPhoneFilled) {
                const currentDate = new Date();
                userData.date = formatDate(currentDate);
                await City();
                await SENDDATA();
                currentCanvas = 0;
                quiz.style.display = 'none';
                closeButton.style.display = 'none';
            }
        });
    };

    function hexToRgb(hex) {
        hex = hex.replace('#', '');
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);
        return `${r}, ${g}, ${b}`;
    }

    const SENDDATA = async () => {
        try {
            const response = await fetch(`${url}/api/application`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData)
            });
            if (!response.ok) {
                console.error('Fetch failed with status:', response.status);
                return;
            }
            const data = await response.json();
        } catch (error) {
            console.error('Error occurred:', error);
        }
    };

    const QUIZ = async () => {
        try {
            const response = await fetch(`${url}/api/quiz/${userData.quiz_id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                console.error('Fetch failed with status:', response.status);
                renderCanvas();
                return;
            }
            const datas = await response.json();
            data = datas.params;
            renderCanvas();
        } catch (error) {
            renderCanvas();
            console.error('Error occurred:', error);
        }
    };

    const STATUS = async (id) => {
        try {
            const response = await fetch(`${url}/api/quiz/counter`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({'quiz_id': userData.quiz_id, 'operation_id': id})
            });
            if (!response.ok) {
                console.error('Fetch failed with status:', response.status);
                return;
            }
            const data = await response.json();
        } catch (error) {
            console.error('Error occurred:', error);
        }
    };

    QUIZ();
});