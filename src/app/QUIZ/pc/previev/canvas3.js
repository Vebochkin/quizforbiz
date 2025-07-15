document.addEventListener('DOMContentLoaded', () => {
            const url = 'https://api.quizforbiz.ru';
            const buttonQuiz = document.querySelector('#qw-buttonQuiz');
            const quiz = document.querySelector('#qw-Quiz');

            // Базовые стили для квиза
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
    `;

            // SVG иконки
            const imgs = {
                next: 'PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTE1LjcwNzEgOC43MDcxMUMxNi4wOTc2IDguMzE2NTggMTYuMDk3NiA3LjY4MzQyIDE1LjcwNzEgNy4yOTI4OUw5LjM0MzE1IDAuOTI4OTMyQzguOTUyNjIgMC41Mzg0MDggOC4zMTk0NiAwLjUzODQwOCA3LjkyODkzIDAuOTI4OTMyQzcuNTM4NDEgMS4zMTk0NiA3LjUzODQxIDEuOTUyNjIgNy45Mjg5MyAyLjM0MzE1TDEzLjU4NTggOEw3LjkyODkzIDEzLjY1NjlDNy41Mzg0MSAxNC4wNDc0IDcuNTM4NDEgMTQuNjgwNSA3LjkyODkzIDE1LjA3MTFDOC4zMTk0NiAxNS40NjE2IDguOTUyNjIgMTUuNDYxNiA5LjM0MzE1IDE1LjA3MTFMMTUuNzA3MSA4LjcwNzExWk0wIDlIMTVWN0gwVjlaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K',
                back: 'PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTAuMjkyODkyIDcuMjkyODlDLTAuMDk3NjMxNSA3LjY4MzQyIC0wLjA5NzYzMTQgOC4zMTY1OCAwLjI5Mjg5MyA4LjcwNzExTDYuNjU2ODUgMTUuMDcxMUM3LjA0NzM4IDE1LjQ2MTYgNy42ODA1NCAxNS40NjE2IDguMDcxMDcgMTUuMDcxMUM4LjQ2MTU5IDE0LjY4MDUgOC40NjE1OSAxNC4wNDc0IDguMDcxMDcgMTMuNjU2OUwyLjQxNDIxIDhMOC4wNzEwNyAyLjM0MzE1QzguNDYxNTkgMS45NTI2MiA4LjQ2MTU5IDEuMzE5NDYgOC4wNzEwNyAwLjkyODkzM0M3LjY4MDU0IDAuNTM4NDA5IDcuMDQ3MzggMC41Mzg0MDkgNi42NTY4NSAwLjkyODkzM0wwLjI5Mjg5MiA3LjI5Mjg5Wk0xNiA3TDAuOTk5OTk5IDdMLjAwMDAwMSA5TDE2IDlMMTYgN1oiIGZpbGw9IiM2QTg0OTYiLz4KPC9N2Zz4K',
                close: 'PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHZpZXdCb3g9IjAgMCAxOCAxOCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgY2xpcC1wYXRoPSJ1cmwoI2NsaXAwXzI2NDVfMTQ4NzYpIj4KPHBhdGggZD0iTTE3LjgzNjIgMTQuNDYxMkwxMi4zNzU0IDkuMDAwNDRMMTcuODM2MiAzLjUzOTY5QzE3Ljk0MDggMy40MzM3OCAxNy45OTk1IDMuMjkwODkgMTcuOTk5NSAzLjE0MkMxNy45OTk1IDIuOTkzMTIgMTcuOTQwOCAyLjg1MDIzIDE3LjgzNjIgMi43NDQzMkwxNS4yNTY2IDAuMTY0NjkyQzE1LjE1MTEgMC4wNTkyMzk5IDE1LjAwOCAwIDE0Ljg1ODkgMEMxNC43MDk3IDAgMTQuNTY2NyAwLjA1OTIzOTkgMTQuNDYxMiAwLjE2NDY5Mkw5LjAwMDQ0IDUuNjI1NDRMMy41Mzk2OSAwLjE2NDY5MkMzLjQzNDIxIDAuMDU5MjM5OSAzLjI5MTE2IDAgMy4xNDIgMEMyLjk5Mjg1IDAgMi44NDk4IDAuMDU5MjM5OSAyLjc0NDMyIDAuMTY0NjkyTDAuMTY0NjkyIDIuNzQ0MzJDMC4wNTkyMzk5IDIuODQ5OCAwIDIuOTkyODUgMCAzLjE0MkMwIDMuMjkxMTYgMC4wNTkyMzk5IDMuNDM0MjEgMC4xNjQ2OTIgMy41Mzk2OUw1LjYyNTQ0IDkuMDAwNDRMMC4xNjQ2OTIgMTQuNDYxMkMwLjA1OTIzOTkgMTQuNTY2NyAwIDE0LjcwOTcgMCAxNC44NTg5QzAgMTUuMDA4IDAuMDU5MjM5OSAxNS4xNTExIDAuMTY0NjkyIDE1LjI1NjZMMi43NDQzMiAxNy44MzYyQzIuODQ5OCAxNy45NDE2IDIuOTkyODUgMTguMDAwOSAzLjE0MiAxOC4wMDA5QzMuMjkxMTYgMTguMDAwOSAzLjQzNDIxIDE3Ljk0MTYgMy41Mzk2OSAxNy44MzYyTDkuMDAwNDQgMTIuMzc1NEwxNC40NjEyIDE3LjgzNjJDMTQuNTY2NyAxNy45NDE2IDE0LjcwOTcgMTguMDAwOSAxNC44NTg5IDE4LjAwMDlDMTUuMDA4IDE4LjAwMDkgMTUuMTUxMSAxNy45NDE2IDE1LjI1NjYgMTcuODM2MkwxNy44MzYyIDE1LjI1NjZDMTcuOTQxNiAxNS4xNTExIDE4LjAwMDkgMTUuMDA4IDE4LjAwMDkgMTQuODU4OUMxOC4wMDA5IDE0LjcwOTcgMTcuOTQxNiAxNC41NjY3IDE3LjgzNjIgMTQuNDYxMloiIGZpbGw9IndoaXRlIi8+CjwvZz4KPGRlZnM+CjxjbGlwUGF0aCBpZD0iY2xpcDBfMjY0NV8xNDg3NiI+CjxyZWN0IHdpZHRoPSIxOCIgaGVpZ2h0PSIxOCIgZmlsbD0id2hpdGUiLz4KPC9jbGlwUGF0aD4KPC9kZWZzPgo8L3N2Zz4K',
                person: 'PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMjIiIHZpZXdCb3g9IjAgMCAyMSAyMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTAuMjIzOSIgY3k9IjUuNzQ5MjkiIHI9IjMuMzk1NzciIGZpbGw9IiM2QTg0OTYiLz4KPGVsbGlwc2UgY3g9IjEwLjIyMzgiIGN5PSIxNS4wODcyIiByeD0iNS45NDI2IiByeT0iMy4zOTU3NyIgZmlsbD0iIzZBODQ5NiIvPgo8L3N2Zz4K',
                email: 'PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0zLjE3MTU3IDUuMTcxNTdDMiA2LjM0MzE1IDIgOC4yMjg3NiAyIDEyQzIgMTUuNzcxMiAyIDE3LjY1NjkgMy4xNzE1NyAxOC44Mjg0QzQuMzQzMTUgMjAgNi4yMjg3NiAyMCAxMCAyMEgxNEMxNy43NzEyIDIwIDE5LjY1NjkgMjAgMjAuODI4NCAxOC44Mjg0QzIyIDE3LjY1NjkgMjIgMTUuNzcxMiAyMiAxMkMyMiA4LjIyODc2IDIyIDYuMzQzMTUgMjAuODI4NCA1LjE3MTU3QzE5LjY1NjkgNCAxNy43NzEyIDQgMTQgNEgxMEM2LjIyODc2IDQgNC4zNDMxNSA0IDMuMTcxNTcgNS4xNzE1N1pNMTguNTc2MiA3LjUxOTg2QzE4Ljg0MTMgNy44MzgwNyAxOC43OTgzIDguMzEwOTkgMTguNDgwMSA4LjU3NjE3TDE2LjI4MzcgMTAuNDA2NkMxNS4zOTczIDExLjE0NTIgMTQuNjc4OSAxMS43NDM5IDE0LjA0NDggMTIuMTUxN0MxMy4zODQzIDEyLjU3NjUgMTIuNzQxMSAxMi44NDQ5IDEyIDEyLjg0NDlDMTEuMjU4OSAxMi44NDQ5IDEwLjYxNTcgMTIuNTc2NSA5Ljk1NTE4IDEyLjE1MTdDOS4zMjExMiAxMS43NDM5IDguNjAyNzEgMTEuMTQ1MiA3LjcxNjM2IDEwLjQwNjZMNS41MTk4NiA4LjU3NjE3QzUuMjAxNjUgOC4zMTA5OSA1LjE1ODY2IDcuODM4MDcgNS40MjM4MyA3LjUxOTg2QzUuNjg5MDEgNy4yMDE2NSA2LjE2MTkzIDcuMTU4NjYgNi40ODAxNCA3LjQyMzgzTDguNjM5MDMgOS4yMjI5MUM5LjU3MTk5IDEwLjAwMDQgMTAuMjE5NyAxMC41Mzg0IDEwLjc2NjYgMTAuODkwMUMxMS4yOTU5IDExLjIzMDYgMTEuNjU0OSAxMS4zNDQ5IDEyIDExLjM0NDlDMTIuMzQ1MSAxMS4zNDQ5IDEyLjcwNDEgMTEuMjMwNiAxMy4yMzM0IDEwLjg5MDFDMTMuNzgwMyAxMC41Mzg0IDE0LjQyOCAxMC4wMDA0IDE1LjM2MSA5LjIyMjkxTDE3LjUxOTkgNy40MjM4M0MxNy44MzgxIDcuMTU4NjYgMTguMzExIDcuMjAxNjUgMTguNTc2MiA3LjUxOTg2WiIgZmlsbD0iIzZBODQ5NiIvPgo8L3N2Zz4K',
                phone: 'PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEwLjAzNzYgNS4zMTYxN0wxMC42ODY2IDYuNDc5MUMxMS4yNzIzIDcuNTI4NTggMTEuMDM3MiA4LjkwNTMyIDEwLjExNDcgOS44Mjc4QzEwLjExNDcgOS44Mjc4IDEwLjExNDcgOS44Mjc4IDEwLjExNDcgOS44Mjc4QzEwLjExNDYgOS44Mjc5MiA4Ljk5NTg4IDEwLjk0NjggMTEuMDI0NSAxMi45NzU1QzEzLjA1MjUgMTUuMDAzNSAxNC4xNzE0IDEzLjg4NjEgMTQuMTcyMiAxMy44ODUzQzE0LjE3MjIgMTMuODg1MyAxNC4xNzIyIDEzLjg4NTMgMTQuMTcyMiAxMy44ODUzQzE1LjA5NDcgMTIuOTYyOCAxNi40NzE0IDEyLjcyNzcgMTcuNTIwOSAxMy4zMTM0TDE4LjY4MzggMTMuOTYyNEMyMC4yNjg2IDE0Ljg0NjggMjAuNDU1NyAxNy4wNjkyIDE5LjA2MjggMTguNDYyMkMxOC4yMjU4IDE5LjI5OTIgMTcuMjAwNCAxOS45NTA1IDE2LjA2NjkgMTkuOTkzNEMxNC4xNTg4IDIwLjA2NTggMTAuOTE4MyAxOS41ODI5IDcuNjY3NzEgMTYuMzMzM0M0LjQxNzEzIDEzLjA4MTcgMy45MzQyMSA5Ljg0MTIyIDQuMDA2NTUgNy45MzMwOUM0LjA0OTUyIDYuNzk5NiA0LjcwMDggNS43NzQyMyA1LjUzNzgxIDQuOTM3MjNDNi45MzA3NiAzLjU0NDI4IDkuMTUzMTcgMy43MzE0NCAxMC4wMzc2IDUuMzE2MTdaIiBmaWxsPSIjNkE4NDk2Ii8+CjxwYXRoIGQ9Ik0xMy4yNTk1IDEuODc5ODNDMTMuMzI1NyAxLjQ3MDk0IDEzLjcxMjIgMS4xOTM1NyAxNC4xMjExIDEuMjU5NzZDMTQuMTQ2NCAxLjI2NDYxIDE0LjIyNzkgMS4yNzk4MyAxNC4yNzA1IDEuMjg5MzNDMTQuMzU1OSAxLjMwODM0IDE0LjQ3NDkgMS4zMzc1OSAxNC42MjMzIDEuMzgwODJDMTQuOTIwMSAxLjQ2NzI2IDE1LjMzNDcgMS42MDk2NyAxNS44MzIzIDEuODM3OEMxNi44Mjg2IDIuMjk0NTYgMTguMTU0NCAzLjA5MzU2IDE5LjUzMDIgNC40NjkzNkMyMC45MDYgNS44NDUxNiAyMS43MDUgNy4xNzA5NyAyMi4xNjE3IDguMTY3MjVDMjIuMzg5OSA4LjY2NDg3IDIyLjUzMjMgOS4wNzk0NyAyMi42MTg3IDkuMzc2MjVDMjIuNjYxOSA5LjUyNDY2IDIyLjY5MTIgOS42NDM2OSAyMi43MTAyIDkuNzI5MDFDMjIuNzE5NyA5Ljc3MTY4IDIyLjcyNjcgOS44MDU5NCAyMi43MzE1IDkuODMxMjVMMjIuNzM3MyA5Ljg2MjQ1QzIyLjgwMzQgMTAuMjcxMyAyMi41Mjg2IDEwLjY3MzkgMjIuMTE5NyAxMC43NDAxQzIxLjcxMiAxMC44MDYxIDIxLjMyNzkgMTAuNTMgMjEuMjYwMSAxMC4xMjMxQzIxLjI1OCAxMC4xMTIxIDIxLjI1MjIgMTAuMDgyOCAyMS4yNDYxIDEwLjA1NTFDMjEuMjMzNyA5Ljk5OTcgMjEuMjEyNCA5LjkxMTg4IDIxLjE3ODYgOS43OTU3MkMyMS4xMTA5IDkuNTYzMzkgMjAuOTkzNCA5LjIxODA2IDIwLjc5ODIgOC43OTIzOEMyMC40MDg0IDcuOTQyMDcgMTkuNzA3NCA2Ljc2Nzg5IDE4LjQ2OTUgNS41MzAwMkMxNy4yMzE3IDQuMjkyMTYgMTYuMDU3NSAzLjU5MTE3IDE1LjIwNzIgMy4yMDEzNEMxNC43ODE1IDMuMDA2MTggMTQuNDM2MiAyLjg4ODY1IDE0LjIwMzggMi44MjA5N0MxNC4wODc3IDIuNzg3MTQgMTMuOTQxNyAyLjc1MzYzIDEzLjg4NjMgMi43NDEzQzEzLjQ3OTMgMi42NzM0NyAxMy4xOTM1IDIuMjg3NTUgMTMuMjU5NSAxLjg3OTgzWiIgZmlsbD0iIzZBODQ5NiIvPgo8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTEzLjQ4NTcgNS4zMjkzQzEzLjU5OTUgNC45MzEwMiAxNC4wMTQ2IDQuNzAwNCAxNC40MTI5IDQuODE0MTlMMTQuMjA2OSA1LjUzNTM0QzE0LjQxMjkgNC44MTQxOSAxNC40MTI5IDQuODE0MTkgMTQuNDEyOSA0LjgxNDE5TDE0LjQxNDQgNC44MTQ2MUwxNC40MTU5IDQuODE1MDVMMTQuNDE5MiA0LjgxNjAyTDE0LjQyNyA0LjgxODM0TDE0LjQ0NjggNC44MjQ1QzE0LjQ2MTggNC44MjkzMiAxNC40ODA3IDQuODM1NiAxNC41MDMxIDQuODQzNTdDMTQuNTQ4IDQuODU5NTEgMTQuNjA3NCA0Ljg4MjE3IDE0LjY4MDIgNC45MTMzN0MxNC44MjU5IDQuOTc1ODEgMTUuMDI0OSA1LjA3MjIzIDE1LjI2OTUgNS4yMTY5NEMxNS43NTg5IDUuNTA2NjIgMTYuNDI3MSA1Ljk4NzggMTcuMjEyMSA2Ljc3Mjc3QzE3Ljk5NzEgNy41NTc3NSAxOC40NzgyIDguMjI1OTMgMTguNzY3OSA4LjcxNTRDMTguOTEyNiA4Ljk1OTkxIDE5LjAwOSA5LjE1ODk3IDE5LjA3MTUgOS4zMDQ2NkMxOS4xMDI3IDkuMzc3NDYgMTkuMTI1NCA5LjQzNjgyIDE5LjE0MTMgOS40ODE3M0MxOS4xNDkzIDkuNTA0MTggMTkuMTU1NSA5LjUyMzAxIDE5LjE2MDQgOS41MzgwOUwxOS4xNjY1IDkuNTU3ODhMMTkuMTY4OCA5LjU2NTYzTDE5LjE2OTggOS41Njg5NkwxOS4xNzAyIDkuNTcwNUMxOS4xNzAyIDkuNTcwNSAxOS4xNzA3IDkuNTcxOTQgMTguNDQ5NSA5Ljc3Nzk4TDE5LjE3MDcgOS41NzE5NEMxOS4yODQ1IDkuOTcwMjEgMTkuMDUzOCAxMC4zODUzIDE4LjY1NTYgMTAuNDk5MUMxOC4yNjA3IDEwLjYxMTkgMTcuODQ5MiAxMC4zODYyIDE3LjczMTMgOS45OTQxM0wxNy43Mjc2IDkuOTgzMzVDMTcuNzIyMyA5Ljk2ODMyIDE3LjcxMTMgOS45Mzg3NCAxNy42OTI4IDkuODk1NTRDMTcuNjU1OCA5LjgwOTIgMTcuNTg4NyA5LjY2Nzk3IDE3LjQ3NzEgOS40NzkzOEMxNy4yNTQxIDkuMTAyNjQgMTYuODUxNCA4LjUzMzM5IDE2LjE1MTQgNy44MzM0M0MxNS40NTE1IDcuMTMzNDggMTQuODgyMiA2LjczMDc4IDE0LjUwNTUgNi41MDc4MUMxNC4zMTY5IDYuMzk2MTkgMTQuMTc1NyA2LjMyOTA5IDE0LjA4OTMgNi4yOTIwOUMxNC4wNDYxIDYuMjczNTggMTQuMDE2NSA2LjI2MjU0IDE0LjAwMTUgNi4yNTcyMUwxMy45OTA3IDYuMjUzNTJDMTMuNTk4NyA2LjEzNTY0IDEzLjM3MjkgNS43MjQxOSAxMy40ODU3IDUuMzI5M1oiIGZpbGw9IiM2QTg0OTYiLz4KPC9zdmc+Cg==',
                close2: 'PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHZpZXdCb3g9IjAgMCAxOCAxOCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTE3LjgzNjIgMTQuNDYxMkwxMi4zNzU0IDkuMDAwNDRMMTcuODM2MiAzLjUzOTY5QzE3Ljk0MDggMy40MzM3OCAxNy45OTk1IDMuMjkwODkgMTcuOTk5NSAzLjE0MkMxNy45OTk1IDIuOTkzMTIgMTcuOTQwOCAyLjg1MDIzIDE3LjgzNjIgMi43NDQzMkwxNS4yNTY2IDAuMTY0NjkyQzE1LjE1MTEgMC4wNTkyMzk5IDE1LjAwOCAwIDE0Ljg1ODkgMEMxNC43MDk3IDAgMTQuNTY2NyAwLjA1OTIzOTkgMTQuNDYxMiAwLjE2NDY5Mkw5LjAwMDQ0IDUuNjI1NDRMMy41Mzk2OSAwLjE2NDY5MkMzLjQzNDIxIDAuMDU5MjM5OSAzLjI5MTE2IDAgMy4xNDIgMEMyLjk5Mjg1IDAgMi44NDk4IDAuMDU5MjM5OSAyLjc0NDMyIDAuMTY0NjkyTDAuMTY0NjkyIDIuNzQ0MzJDMC4wNTkyMzk5IDIuODQ5OCAwIDIuOTkyODUgMCAzLjE0MkMwIDMuMjkxMTYgMC4wNTkyMzk5IDMuNDM0MjEgMC4xNjQ2OTIgMy41Mzk2OUw1LjYyNTQ0IDkuMDAwNDRMMC4xNjQ2OTIgMTQuNDYxMkMwLjA1OTIzOTkgMTQuNTY2NyAwIDE0LjcwOTcgMCAxNC44NTg5QzAgMTUuMDA4IDAuMDU5MjM5OSAxNS4xNTExIDAuMTY0NjkyIDE1LjI1NjZMMi43NDQzMiAxNy44MzYyQzIuODQ5OCAxNy45NDE2IDIuOTkyODUgMTguMDAwOSAzLjE0MiAxOC4wMDA5QzMuMjkxMTYgMTguMDAwOSAzLjQzNDIxIDE3Ljk0MTYgMy41Mzk2OSAxNy44MzYyTDkuMDAwNDQgMTIuMzc1NEwxNC40NjEyIDE3LjgzNjJDMTQuNTY2NyAxNy45NDE2IDE0LjcwOTcgMTguMDAwOSAxNC44NTg5IDE4LjAwMDlDMTUuMDA4IDE4LjAwMDkgMTUuMTUxMSAxNy45NDE2IDE1LjI1NjYgMTcuODM2MkwxNy44MzYyIDE1LjI1NjZDMTcuOTQxNiAxNS4xNTExIDE4LjAwMDkgMTUuMDA4IDE4LjAwMDkgMTQuODU4OUMxOC4wMDA5IDE0LjcwOTcgMTcuOTQxNiAxNC41NjY3IDE3LjgzNjIgMTQuNDYxMloiIGZpbGw9IiMxMTE3MUMiLz4KPC9zdmc+Cg=='
            };

            let currentCanvas = 1;
            let currentIndex = 0;
            let data = {};
            const isMobile = window.innerWidth < 576;
            const userData = {
                date: '',
                position: '',
                quiz_id: 'Quiz_id',
                name: null,
                email: null,
                phone: null,
                details: {
                    answers: [],
                    url: '',
                    ip: ''
                }
            };

            // Создаем кнопку закрытия
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
        border-radius: 50%;
        cursor: pointer;
        z-index: 1001;
        background: url('data:image/svg+xml;base64,${imgs.close2}') no-repeat center;
        background-size: 20px;
        transition: all 0.2s ease;
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

                    // Определяем стиль отображения изображения
                    const imageDisplayStyle = data.theme.image_display || 'cover';
                    const imagePosition = data.theme.image_position || 'left';

                    // Определяем стиль кнопки
                    const buttonStyle = data.theme.button_style || 'default';
                    let buttonStyles = '';

                    switch (buttonStyle) {
                        case 'rounded':
                            buttonStyles = 'border-radius: 50px;';
                            break;
                        case 'square':
                            buttonStyles = 'border-radius: 0;';
                            break;
                        case 'outline':
                            buttonStyles = `background: transparent; border: 2px solid ${data.theme.button_color || '#105EFE'}; color: ${data.theme.button_color || '#105EFE'};`;
                            break;
                        case 'default':
                        default:
                            buttonStyles = `background-color: ${data.theme.button_color || '#105EFE'}; color: ${data.theme.button_text_color || '#fff'}; border-radius: 8px;`;
                    }

                    // Определяем порядок элементов в зависимости от положения изображения
                    const contentOrder = imagePosition === 'right' ?
                        `<div style="width: 50%; padding: 40px; display: flex; flex-direction: column; justify-content: space-between; box-sizing: border-box;">
                <!-- Контент -->
            </div>
            ${canvas1.video ? `
                <div style="width: 50%; height: 100%; padding: 20px; box-sizing: border-box;">
                    <video loop autoplay muted style="width: 100%; height: 100%; object-fit: ${imageDisplayStyle === 'contain' ? 'contain' : 'cover'}; border-radius: 16px;">
                        <source src="${canvas1.video}" type="video/mp4">
                    </video>
                </div>
            ` : `
                <div style="width: 50%; height: 100%; padding: 20px; box-sizing: border-box;">
                    <div style="
                        width: 100%;
                        height: 100%;
                        background: ${imageDisplayStyle === 'color' && data.theme.background_color ? data.theme.background_color : `url(${canvas1.img})`} 
                        ${imageDisplayStyle === 'color' ? '' : `no-repeat ${imageDisplayStyle === 'contain' ? 'center center' : 'center center/cover'}`};
                        border-radius: 16px;
                    "></div>
                </div>
            `}` : 
            `${canvas1.video ? `
                <div style="width: 50%; height: 100%; padding: 20px; box-sizing: border-box;">
                    <video loop autoplay muted style="width: 100%; height: 100%; object-fit: ${imageDisplayStyle === 'contain' ? 'contain' : 'cover'}; border-radius: 16px;">
                        <source src="${canvas1.video}" type="video/mp4">
                    </video>
                </div>
            ` : `
                <div style="width: 50%; height: 100%; padding: 20px; box-sizing: border-box;">
                    <div style="
                        width: 100%;
                        height: 100%;
                        background: ${imageDisplayStyle === 'color' && data.theme.background_color ? data.theme.background_color : `url(${canvas1.img})`} 
                        ${imageDisplayStyle === 'color' ? '' : `no-repeat ${imageDisplayStyle === 'contain' ? 'center center' : 'center center/cover'}`};
                        border-radius: 16px;
                    "></div>
                </div>
            `}
            <div style="width: 50%; padding: 40px; display: flex; flex-direction: column; justify-content: space-between; box-sizing: border-box;">
                <!-- Контент -->
            </div>`;
        
        container.innerHTML = `
            <div style="display: flex; width: 100%; height: 100%; flex-direction: ${isMobile ? 'column' : 'row'};">
                ${contentOrder}
            </div>
        `;
        
        // Находим контейнер для контента и заполняем его
        const contentContainer = container.querySelector('div[style*="padding: 40px"]');
        contentContainer.innerHTML = `
            <div style="display: flex; align-items: center; margin-bottom: 40px;">
                <div style="width: 64px; height: 64px; border-radius: 50%; background: ${canvas1.logo ? `url(${canvas1.logo})` : 'rgba(66, 87, 102, 0.52)'}; background-size: cover; margin-right: 24px;"></div>
                <p style="margin: 0; font-size: 16px; color: ${data.theme.text_color || 'inherit'};">${canvas1.description}</p>
            </div>
            <div style="flex-grow: 1;">
                <h1 style="margin: 0; font-size: 28px; margin-bottom: 20px; font-weight: 600; color: ${data.theme.text_color || 'inherit'};">${canvas1.title}</h1>
                <h3 style="margin: 0; font-size: 18px; margin-bottom: 40px; color: ${data.theme.text_color || 'inherit'};">${canvas1.subtitle}</h1>
                <button id="changeCanvas" style="
                    padding: 20px 40px;
                    ${buttonStyles}
                    border: none;
                    font-size: 18px;
                    cursor: pointer;
                    margin: 0 auto;
                    margin-top: 10px;
                ">
                    ${canvas1.button}
                </button>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: flex-end;">
                <div style="text-align: left;">
                    <p style="margin: 0; font-size: 16px; color: ${data.theme.text_color || 'inherit'};">${canvas1.tel}</p>
                    <p style="margin: 8px 0 0; font-size: 14px; color: ${data.theme.text_color || 'inherit'};">${canvas1.name}</p>
                </div>
                <a href="http://quizforbiz.ru" style="text-decoration: none; font-size: 14px; color: ${data.theme.text_color || 'inherit'};">
                    Создано в <span style="color: #105EFE;">Quiz for biz</span>
                </a>
            </div>
        `;

        document.getElementById('changeCanvas').addEventListener('click', () => {
            STATUS(13);
            currentCanvas = 2;
            renderCanvas();
        });
    };

    const renderAnswers = (container) => {
        const questionData = data.canvas2[currentIndex];
        const totalQuestions = data.canvas2.length;
        const progressPercentage = ((currentIndex) / totalQuestions) * 100;
        STATUS(currentIndex + 1);

        container.innerHTML = `
            <div style="width: 100%; height: 100%; display: flex; flex-direction: column; padding: 40px; box-sizing: border-box; background-color: ${data.theme.background_color || 'inherit'};">
                <div style="margin-bottom: 32px;">
                    <h1 style="margin: 0 0 16px 0; font-size: 28px; font-weight: 600; color: ${data.theme.text_color || 'inherit'};">${questionData.question}</h1>
                    <p style="margin: 0; font-size: 18px; color: ${data.theme.text_color || 'inherit'};">${questionData.description || ''}</p>
                </div>
                <div id="answers_for_quiz" style="flex: 1; margin-bottom: 40px; overflow-y: auto; padding-right: 10px;"></div>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-top: auto;">
                    <div style="flex: 1; margin-right: 20px;">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                            <span style="font-size: 16px; color: ${data.theme.text_color || 'inherit'};">Готово: <span style="color: ${data.theme.button_color || '#105EFE'};">${Math.round(progressPercentage)}%</span></span>
                        </div>
                        <div style="width: 100%; height: 6px; background: #f0f0f0; border-radius: 3px;">
                            <div style="width: ${progressPercentage}%; height: 100%; background: ${data.theme.button_color || '#105EFE'}; border-radius: 3px;"></div>
                        </div>
                    </div>
                    <div style="display: flex; align-items: center; gap: 12px;">
                        <a href="http://quizforbiz.ru" style="text-decoration: none; font-size: 14px; margin-right: 20px; color: ${data.theme.text_color || 'inherit'};">
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
                            background-color: ${data.theme.button_color || '#105EFE'};
                            color: ${data.theme.button_text_color || '#fff'};
                            border: none;
                            font-size: 18px;
                            cursor: pointer;
                            border-radius: 8px;
                        ">
                            ${currentIndex < data.canvas2.length - 1 ? 'Далее' : 'Завершить'}
                        </button>
                    </div>
                </div>
            </div>
        `;

        const renderQuiz = () => {
            const answersquiz = document.querySelector('#answers_for_quiz');
            const currentAnswers = userData.details.answers[currentIndex].answer;
            
            // Определяем количество колонок для вариантов ответов
            const columns = questionData.answers.length > 4 ? 2 : 1;
            
            // Определяем стиль кнопки
            const buttonStyle = data.theme.button_style || 'default';
            let answerStyles = '';
            
            switch(buttonStyle) {
                case 'rounded':
                    answerStyles = 'border-radius: 50px;';
                    break;
                case 'square':
                    answerStyles = 'border-radius: 0;';
                    break;
                case 'outline':
                    answerStyles = `background: transparent; border: 2px solid ${data.theme.button_color || '#105EFE'}; color: ${data.theme.button_color || '#105EFE'};`;
                    break;
                case 'default':
                default:
                    answerStyles = `background: ${data.theme.background_color || 'inherit'}; border: 1px solid #eee;`;
            }

            switch (questionData.name) {
                case 'Answers':
                    answersquiz.innerHTML = `
                        <div style="display: grid; grid-template-columns: repeat(${columns}, 1fr); gap: 12px;">
                            ${questionData.answers.map((answer, index) => {
                                const isActive = currentAnswers.includes(answer);
                                const activeStyles = isActive ? `
                                    border: 1px solid ${data.theme.button_color || '#105EFE'} !important;
                                    background: rgba(${hexToRgb(data.theme.button_color || '#105EFE')}, 0.05) !important;
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
                                    ">
                                        <div style="
                                            width: 24px;
                                            height: 24px;
                                            border: 2px solid ${isActive ? data.theme.button_color || '#105EFE' : '#ddd'};
                                            background: ${isActive ? data.theme.button_color || '#105EFE' : 'transparent'};
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
                                        <p style="margin: 0; font-size: 16px; color: ${data.theme.text_color || 'inherit'}; word-break: break-word;">${answer}</p>
                                    </div>
                                `;
                            }).join('')}
                        </div>
                    `;
                    break;
                case 'Calculator':
                    const currentValue = currentAnswers[0] || questionData.min;
                    answersquiz.innerHTML = `
                        <div style="max-width: 500px; margin: 0 auto; width: 100%;">
                            <input 
                                type="text" 
                                id="count" 
                                value="${currentValue}"
                                style="
                                    width: 100%;
                                    padding: 16px;
                                    border: 1px solid #ddd;
                                    font-size: 16px;
                                    margin-bottom: 16px;
                                    text-align: center;
                                    border-radius: 8px;
                                    color: ${data.theme.text_color || 'inherit'};
                                    background-color: ${data.theme.background_color || 'inherit'};
                                "
                            />
                            <input 
                                type="range" 
                                id="range" 
                                min="${questionData.min}" 
                                max="${questionData.max}" 
                                step="${questionData.step}" 
                                value="${currentValue}"
                                style="
                                    width: 100%;
                                    height: 6px;
                                    accent-color: ${data.theme.button_color || '#105EFE'};
                                    margin-bottom: 8px;
                                "
                            />
                            <div style="display: flex; justify-content: space-between;">
                                <span style="color: ${data.theme.text_color || 'inherit'}">${questionData.min}</span>
                                <span style="color: ${data.theme.text_color || 'inherit'}">${questionData.max}</span>
                            </div>
                        </div>
                    `;
                    break;
                case 'AnswersImg':
                    answersquiz.innerHTML = `
                        <div style="display: flex; height: 300px; gap: 20px; flex-direction: ${isMobile ? 'column' : 'row'};">
                            <div style="${isMobile ? 'width: 100%;' : 'width: 50%;'}">
                                ${questionData.answers.map((answer, index) => {
                                    const isActive = currentAnswers.includes(answer);
                                    return `
                                        <div style="
                                            display: flex;
                                            align-items: center;
                                            padding: 16px;
                                            border: 1px solid ${isActive ? data.theme.button_color || '#105EFE' : '#eee'};
                                            background: ${isActive ? `rgba(${hexToRgb(data.theme.button_color || '#105EFE')}, 0.05)` : 'inherit'};
                                            cursor: pointer;
                                            margin-bottom: 12px;
                                            border-radius: 8px;
                                        ">
                                            <div style="
                                                width: 24px;
                                                height: 24px;
                                                border: 2px solid ${isActive ? data.theme.button_color || '#105EFE' : '#ddd'};
                                                background: ${isActive ? data.theme.button_color || '#105EFE' : 'transparent'};
                                                border-radius: ${questionData.multiple ? '4px' : '50%'};
                                                margin-right: 12px;
                                                display: flex;
                                                align-items: center;
                                                justify-content: center;
                                            ">
                                                ${isActive ? questionData.multiple ? 
                                                    '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 12L10 17L20 7" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>' : 
                                                    '<div style="width: 12px; height: 12px; background: white; border-radius: 50%;"></div>' : ''}
                                            </div>
                                            <p style="margin: 0; font-size: 16px; color: ${data.theme.text_color || 'inherit'};">${answer}</p>
                                        </div>
                                    `;
                                }).join('')}
                            </div>
                            <div style="${isMobile ? 'width: 100%; height: 200px;' : 'width: 50%; height: auto;'} background: url(${questionData.imgs[0]}) no-repeat center center; background-size: cover; border-radius: 8px;"></div>
                        </div>
                    `;
                    break;
                case 'AnswersAndImg':
                    answersquiz.innerHTML = `
                        <div style="display: grid; grid-template-columns: ${isMobile ? '1fr' : '1fr 1fr'}; gap: 16px;">
                            ${questionData.answers.map((answer, index) => {
                                const isActive = currentAnswers.includes(answer);
                                return `
                                    <div style="
                                        border: 1px solid ${isActive ? data.theme.button_color || '#105EFE' : '#eee'};
                                        padding: 12px;
                                        overflow: hidden;
                                        background: ${isActive ? `rgba(${hexToRgb(data.theme.button_color || '#105EFE')}, 0.05)` : 'inherit'};
                                        cursor: pointer;
                                        border-radius: 8px;
                                    ">
                                        <div style="height: ${isMobile ? '150px' : '120px'}; background: url(${questionData.imgs[index]}) no-repeat center center; background-size: ${questionData.imgSize || 'cover'}; margin-bottom: 12px; border-radius: 4px;"></div>
                                        <div style="display: flex; align-items: center;">
                                            <div style="
                                                width: 24px;
                                                height: 24px;
                                                border: 2px solid ${isActive ? data.theme.button_color || '#105EFE' : '#ddd'};
                                                background: ${isActive ? data.theme.button_color || '#105EFE' : 'transparent'};
                                                border-radius: ${questionData.multiple ? '4px' : '50%'};
                                                margin-right: 12px;
                                                display: flex;
                                                align-items: center;
                                                justify-content: center;
                                            ">
                                                ${isActive ? questionData.multiple ? 
                                                    '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 12L10 17L20 7" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>' : 
                                                    '<div style="width: 12px; height: 12px; background: white; border-radius: 50%;"></div>' : ''}
                                            </div>
                                            <p style="margin: 0; font-size: 16px; color: ${data.theme.text_color || 'inherit'};">${answer}</p>
                                        </div>
                                    </div>
                                `;
                            }).join('')}
                        </div>
                    `;
                    break;
            }

            const answerElements = document.querySelectorAll('#answers_for_quiz > div > div');
            answerElements.forEach((element, index) => {
                element.addEventListener('click', () => {
                    answer(index, questionData);
                    
                    const currentAnswers = userData.details.answers[currentIndex].answer;
                    answerElements.forEach((el, idx) => {
                        const answerText = questionData.answers[idx];
                        const isActive = currentAnswers.includes(answerText);
                        
                        el.style.border = `1px solid ${isActive ? data.theme.button_color || '#105EFE' : '#eee'}`;
                        el.style.background = isActive ? `rgba(${hexToRgb(data.theme.button_color || '#105EFE')}, 0.05)` : 'inherit';
                        
                        const indicator = el.querySelector('div[style*="border: 2px solid"]');
                        if (indicator) {
                            indicator.style.border = `2px solid ${isActive ? data.theme.button_color || '#105EFE' : '#ddd'}`;
                            indicator.style.background = isActive ? data.theme.button_color || '#105EFE' : 'transparent';
                            indicator.innerHTML = isActive ? 
                                questionData.multiple ? 
                                    '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 12L10 17L20 7" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>' : 
                                    '<div style="width: 12px; height: 12px; background: white; border-radius: 50%;"></div>' : 
                                '';
                        }
                    });
                });
            });

            if (questionData.name === 'Calculator') {
                const rangeInput = document.getElementById('range');
                const countInput = document.getElementById('count');
                rangeInput.addEventListener('input', () => {
                    countInput.value = rangeInput.value;
                    userData.details.answers[currentIndex].answer = [rangeInput.value];
                });
                countInput.addEventListener('input', () => {
                    const value = parseInt(countInput.value);
                    if (!isNaN(value) && value >= questionData.min && value <= questionData.max) {
                        rangeInput.value = value;
                        userData.details.answers[currentIndex].answer = [value];
                    }
                });
            }
        };

        renderQuiz();

        document.getElementById('qw-nextButton').addEventListener('click', () => {
            if (userData.details.answers[currentIndex].answer.length > 0 || 
                (data.canvas2[currentIndex].name === 'Calculator' && userData.details.answers[currentIndex].answer[0] !== undefined)) {
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
        
        // Определяем стиль отображения изображения
        const imageDisplayStyle = data.theme.image_display || 'cover';
        const imagePosition = data.theme.image_position || 'left';
        
        // Определяем стиль кнопки
        const buttonStyle = data.theme.button_style || 'default';
        let buttonStyles = '';
        
        switch(buttonStyle) {
            case 'rounded':
                buttonStyles = 'border-radius: 50px;';
                break;
            case 'square':
                buttonStyles = 'border-radius: 0;';
                break;
            case 'outline':
                buttonStyles = `background: transparent; border: 2px solid ${data.theme.button_color || '#105EFE'}; color: ${data.theme.button_color || '#105EFE'};`;
                break;
            case 'default':
            default:
                buttonStyles = `background-color: ${data.theme.button_color || '#105EFE'}; color: ${data.theme.button_text_color || '#fff'}; border-radius: 8px;`;
        }
        
        // Определяем порядок элементов в зависимости от положения изображения
        const contentOrder = imagePosition === 'right' ? 
            `<div style="${isMobile ? 'width: 100%; padding: 20px;' : 'width: 50%; padding: 40px;'} display: flex; flex-direction: column; justify-content: center; box-sizing: border-box; position: relative; background-color: ${data.theme.background_color || 'inherit'};">
                <!-- Контент -->
            </div>
            <div style="${isMobile ? 'width: 100%; height: 200px;' : 'width: 50%; height: 100%;'} padding: 20px; box-sizing: border-box;">
                ${canvas3.video ? `
                    <video loop autoplay muted style="width: 100%; height: 100%; object-fit: ${imageDisplayStyle === 'contain' ? 'contain' : 'cover'}; border-radius: 16px;">
                        <source src="${canvas3.video}" type="video/mp4">
                    </video>
                ` : `
                    <div style="
                        width: 100%;
                        height: 100%;
                        background: ${imageDisplayStyle === 'color' && data.theme.background_color ? data.theme.background_color : `url(${canvas3.img})`} 
                        ${imageDisplayStyle === 'color' ? '' : `no-repeat ${imageDisplayStyle === 'contain' ? 'center center' : 'center center/cover'}`};
                        border-radius: 16px;
                    "></div>
                `}
            </div>` : 
            `<div style="${isMobile ? 'width: 100%; height: 200px;' : 'width: 50%; height: 100%;'} padding: 20px; box-sizing: border-box;">
                ${canvas3.video ? `
                    <video loop autoplay muted style="width: 100%; height: 100%; object-fit: ${imageDisplayStyle === 'contain' ? 'contain' : 'cover'}; border-radius: 16px;">
                        <source src="${canvas3.video}" type="video/mp4">
                    </video>
                ` : `
                    <div style="
                        width: 100%;
                        height: 100%;
                        background: ${imageDisplayStyle === 'color' && data.theme.background_color ? data.theme.background_color : `url(${canvas3.img})`} 
                        ${imageDisplayStyle === 'color' ? '' : `no-repeat ${imageDisplayStyle === 'contain' ? 'center center' : 'center center/cover'}`};
                        border-radius: 16px;
                    "></div>
                `}
            </div>
            <div style="${isMobile ? 'width: 100%; padding: 20px;' : 'width: 50%; padding: 40px;'} display: flex; flex-direction: column; justify-content: center; box-sizing: border-box; position: relative; background-color: ${data.theme.background_color || 'inherit'};">
                <!-- Контент -->
            </div>`;
        
        container.innerHTML = `
            <div style="display: flex; width: 100%; height: 100%; flex-direction: ${isMobile ? 'column' : 'row'};">
                ${contentOrder}
            </div>
        `;
        
        // Находим контейнер для контента и заполняем его
        const contentContainer = container.querySelector('div[style*="padding: 40px"], div[style*="padding: 20px"]');
        contentContainer.innerHTML = `
            <div style="margin-bottom: 40px;">
                <h1 style="margin: 0 0 12px 0; font-size: ${isMobile ? '24px' : '28px'}; font-weight: 600; color: ${data.theme.text_color || 'inherit'};">${canvas3.title}</h1>
                <p style="margin: 0; font-size: ${isMobile ? '16px' : '18px'}; color: ${data.theme.text_color || 'inherit'};">${canvas3.subtitle}</p>
            </div>
            ${canvas3.name ? `
            <div style="margin-bottom: 24px;">
                <label style="display: block; margin-bottom: 8px; font-size: 16px; color: ${data.theme.text_color || 'inherit'};">Имя*</label>
                <div style="position: relative;">
                    <input type="text" id="userName" placeholder="Иван" style="
                        width: 100%;
                        max-width: 300px;
                        padding: 16px 16px 16px 48px;
                        border: 1px solid #ddd;
                        font-size: 16px;
                        border-radius: 8px;
                        color: ${data.theme.text_color || 'inherit'};
                        background-color: ${data.theme.background_color || 'inherit'};
                    ">
                    <img src="data:image/svg+xml;base64,${imgs.person}" alt="Имя" style="
                        position: absolute;
                        left: 16px;
                        top: 50%;
                        transform: translateY(-50%);
                        width: 20px;
                        height: 20px;
                    ">
                </div>
            </div>
            ` : ''}
            ${canvas3.email ? `
            <div style="margin-bottom: 24px;">
                <label style="display: block; margin-bottom: 8px; font-size: 16px; color: ${data.theme.text_color || 'inherit'};">Email*</label>
                <div style="position: relative;">
                    <input type="email" id="userEmail" placeholder="Mail@example.com" style="
                        width: 100%;
                        max-width: 300px;
                        padding: 16px 16px 16px 48px;
                        border: 1px solid #ddd;
                        font-size: 16px;
                        border-radius: 8px;
                        color: ${data.theme.text_color || 'inherit'};
                        background-color: ${data.theme.background_color || 'inherit'};
                    ">
                    <img src="data:image/svg+xml;base64,${imgs.email}" alt="Email" style="
                        position: absolute;
                        left: 16px;
                        top: 50%;
                        transform: translateY(-50%);
                        width: 20px;
                        height: 20px;
                    ">
                </div>
            </div>
            ` : ''}
            ${canvas3.phone ? `
            <div style="margin-bottom: 40px;">
                <label style="display: block; margin-bottom: 8px; font-size: 16px; color: ${data.theme.text_color || 'inherit'};">Телефон*</label>
                <div style="position: relative;">
                    <input type="tel" id="userTel" placeholder="+7 (900) 000-00-00" style="
                        width: 100%;
                        max-width: 300px;
                        padding: 16px 16px 16px 48px;
                        border: 1px solid #ddd;
                        font-size: 16px;
                        border-radius: 8px;
                        color: ${data.theme.text_color || 'inherit'};
                        background-color: ${data.theme.background_color || 'inherit'};
                    ">
                    <img src="data:image/svg+xml;base64,${imgs.phone}" alt="Телефон" style="
                        position: absolute;
                        left: 16px;
                        top: 50%;
                        transform: translateY(-50%);
                        width: 20px;
                        height: 20px;
                    ">
                </div>
            </div>
            ` : ''}
            <div style="display: flex; justify-content: flex-start; gap: 12px; margin-bottom: 40px; flex-wrap: wrap;">
                <button id="sendForm" style="
                    padding: 0 40px;
                    height: 56px;
                    ${buttonStyles}
                    border: none;
                    font-size: 18px;
                    cursor: pointer;
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
                    color: ${data.theme.text_color || 'inherit'};
                ">
                    Назад
                </button>
            </div>
            <div style="position: ${isMobile ? 'static' : 'absolute'}; ${isMobile ? 'margin-top: 20px;' : ''} bottom: 40px; right: 40px;">
                <a href="http://quizforbiz.ru" style="text-decoration: none; font-size: 14px; color: ${data.theme.text_color || 'inherit'};">
                    Создано в <span style="color: #105EFE;">Quiz for biz</span>
                </a>
            </div>
        `;

        document.getElementById('handleBack').addEventListener('click', () => {
            currentCanvas = 2;
            renderCanvas();
        });

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

    // Вспомогательная функция для преобразования hex в rgb
    function hexToRgb(hex) {
        // Удаляем символ # если он есть
        hex = hex.replace('#', '');
        
        // Преобразуем каждый компонент цвета
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