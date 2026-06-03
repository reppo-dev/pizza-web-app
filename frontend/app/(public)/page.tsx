import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { getAllPizzas } from "@/action/pizza";
import CardPizza from "@/components/card-pizza";
import { Pizza } from "@/interface";

export default async function HomePage() {
  const getPizza = await getAllPizzas();

  const pizzas: Pizza[] = getPizza.data.slice(0, 4);
  return (
    <div className="min-h-screen bg-white text-gray-800">
      <header className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur supports-backdrop-filter:bg-white/60">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          <SidebarTrigger />
          <Link
            href="/"
            className="text-2xl font-black tracking-tight text-primary"
          >
            NextPizza
          </Link>

          <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
            <Link href="/" className="transition-colors hover:text-primary">
              Home
            </Link>
            <Link href="/" className="transition-colors hover:text-primary">
              About
            </Link>
          </nav>
        </div>
      </header>
      <main>
        <section className="relative flex min-h-[85vh] items-center justify-center bg-linear-to-br from-red-50 to-amber-50 px-6 py-20">
          <div className="relative z-10 mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-extrabold leading-tight text-primary sm:text-5xl md:text-6xl">
              The fastest pizza in town
            </h1>
            <p className="mt-6 text-lg text-gray-600 sm:text-xl">
              Fresh dough, premium toppings, and lightning‑fast delivery. Your
              pizza is just a tap away.
            </p>
          </div>
          <div className="absolute inset-0 opacity-10">
            <Image
              src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJQA9wMBEQACEQEDEQH/xAAcAAACAwEBAQEAAAAAAAAAAAAFBgMEBwIBAAj/xAA9EAABAwMCBQIEBQEGBgMBAAABAgMEAAUREiEGEzFBUSJhFDJxgQcVI5GhQjNSYrHB0RZTcuHw8SRDkiX/xAAaAQADAQEBAQAAAAAAAAAAAAACAwQBBQAG/8QAMhEAAgICAgEDAwMEAQMFAAAAAQIAAxEhBBIxEyJBFDJRBWFxI0KBoZEVM7FSwdHh8f/aAAwDAQACEQMRAD8ASEsS2ZjcZUZYfVg6TXHKgrCYYmqcOQLQlhDd2klctSQDpc+StqFKEdjuAD1OZDfrSILx5auYwsZQqumpDeJ0Kbe4mc8RWlR/VbA2rxEsrOdRUW3jORQZnrBiXYVgu04BUeC6UnoojArC4ie24XVwLeUMl11rTgZ23pRuxC7Zg+3Qiw+eekZR1zSrrcrgTrcGgNsxsZv/AMOwG2hjbtXONbNOsvGBkY4ik68pWRRCsr4jfpkxCEe5TJLWS7XgrNqS2V11yhEvzlmvLMp4laErwoe1P46FWzIuZUtlRAn6AgSWblbm3miFtutgjfOQRXYBBE+PYFTiY3x/wOba67KgAlhayoox8uetR3VdfcJ4TKbpFLajt3oqXzNYQUtKkHPSqhuDLTM1TCRgUtqg03MNwJ7brWpZA9s1BdSQcCMDSrIvATJCRujvTU4xKZgkyS6MR5EXnx8aiO1epdlfqYEGQYnMUM1Ra+BCVcmaXwe3EjhIdQn3JFc9nJM6CJqaJGRbZAwEor3WYcwBxrwZFlw1yICUpeAyMDrTAesUyBhM0c4XvLTBdVDXpHUpNH3BiPTIgdaVIJSsFJHUHrRg5meJxnG9bPT5Ky4pKQMnPQV4jAhqO2o1WTh96TodeylA7YqVrQDLaeAzbaPkGNAjhCHlZSOpol5O8StuJhfbLNztsRKEuwJCSD21VX6oxIxU3giZyxeMRghRQXE+nmDqrsKgZTmRM3aE+Hjz5yOYpQT1Uo74FSuB2HaKIjTLuiHZKYaF62U7A+9PTk9bgB4h0Hq0siywfhlSrpI5TB6DuqupZcqDc6lSO74QSrE4T4YkykSGlkkHISTsahPI7Su6iwDYjKQ1BUhtLaeWBsQKE24kZqPmFBypDGCAQRTFIaTkFTMw4m4dLl1WqKdCFdRikO29T6P9NJC9mgtfDnJSC5IGaDtOqt+8CRJsgUcJeBrO8I3n8S2LdOiskt5UnHatAIORJXsVjuKl5U5qPNSQc9xVdAEk5Bwup+gfw2fUOFYSXVepLY61enifH2nLkypxreWfh1slIUTmgsOoKjJmJ3iMh1S1Ad81Fkq2obLFOagBRBq2s5ipE42A1mjU7npCha0jCVfajIB8z056g+a2el+HIWEFpROmkWJvInpajLLDgyMA96W4yIyvzHezMPOshaQoJx1qIrOihEtuzpcFwaXT+9DsRujGCLxE45GQlxXXrQl4Pp53GmySmZTYQUgp+lMRoqxMRY/EHgRueyZtsTpeSN0gfNTgSsmZQ38zHnWnGnFNOoKFpOCk9qbmKA3iGrHb0IWHXk75yBUXJvP2idrgcQH3NG4TUIaCG/SKiLzsioQfLuWnPq2+tMrUsZj4UQQ9d5/MKIwdcQOmneugqLjZkL4znEZfyGJa4RbYWyuU2MKC05NIsuGxnc+WBl+wR0hLylsDPKPyp3+wqRUY9mIm7Y4XcrtWO7LcD8eE8tvVsQN/2rEqcp2Aj1rKkEiL3Esy6ouIj3JLzCkDKW1DG3YjzXQCEr7p9XwbawPYJ7Zrk8y8AXQlPTKiBj7mkNSScCdS2yla+1mhNBkTnm4cV1WFsrwA4k6kq+hG1JvR0AzORStPILdDmEJ0s21pp1CtTTmB9KoU4UETlivtZ1PwZE20JRKlk+reh65M6fb0xgSOdw6zKa9KlZ9jWOn4mJzWU7nMLhRDLe2rPuaSKiZln6gSdTp62PRGlEDUgddqbtRBS9bG8xbmWti5pUFMjWOma2tyDuVsFZfMYbVMftNuDKsBKBgZq8clFXZnztvCZ7PaIDm6rxIIbfGpR71KeapOJR/0m1V7GSt8BSXWVlb7eVdNq87fJkr0LnGYp3j8Nbyp1RjNodCd8g4p1HIHiIt43XYgdPAd8ksqxDUlSex70xeUmdQE4zOMydP4XX4tJcWhpBP9JNEeYoMYOE5+ZFJ/Dm7RGgtakqVkekCsPPrEL/p9mMiOdu/DW1pEdyY47jQCpsHqaWl7hS1sKri9viecR/h9DbSxOsKFrSD+qwpWfuKL1kdcoZ48Yq2xGK1mLEtyW3WC2tI+UilmxV+6NHHsIyBELi64ttTtKUKT41Jxn6VgXv4nsldGR25RlNZ1EbZpTVxq2RmsNwXGc0hZpWepxCZewj7brwypgofUNxjeqkfUkZN6mWfiHboqr2mVFCQHPmArxfAm11ZcQF8YEp0jbG1T+lnZn09KgaE5M1WOtaKY86li0wjcZH6uQyNzW2OKhgeZLZ7jNAgxIcRhIYYQB3ONzU1hbzJ/JxFWG8iWEvSHVM6FhK3sE5z0x5PtTlpBny9VDWHAjtZrdcnZSXoEtkwkpxpCU/qf9QV0o2LnVW500SmlMOu5fn/mtvAkWy3rceXs8hbmQkeUitp49q+/GMxldlFvssOv4gi9fBX6O09PMVctCDpMhBCkA9iAQcZHvinkMVx23GVEVP7QcfsYp3v8P5slyNIs6osiIUjWht8K0nO+AaZWrIv5MzkclLmUPkAfEZoQZtMcWK9JShgIGlaMgDwBnfI81w+ZVdVabAc58iCU/q+vxNQndLLIVZ0IgOmUWRrS2eqwOwx3qXj/AKkps9Nhj+Zq8zvfmxcZ+fiRwVSn4SNcZ+Ms4SkPIKCo+ADXa312JdbbSjfcD/E6tUmeFvtsN/EraWUr0K6f79/2pJdh4GYm5qmHZjgRjZdkKIQvkpz/AI8n9qTV+oUE47TmtdTnWYp3VziCZNkRHVsRIiFYDid1EY/iusoUDJmAsx9sv2h6zQGktOOc+R/UrqaTZfUp3Kko5JX2mV+IIrLkJyfblag3/aNnsPpW9a3GRG022K3R4iJvgaUXGx9wKWAoOAJ1WVmXBMvWfi+UzKUtwuOpOwGdhSb0YkYMXZRUa9xwtHFr0hxTa2Ag5A3HUU0I2PbODYgOVhe4T30ROZb2A8vuBjNSm4LkDzA4rJ26vqLcG8XSa661JZWgpOwKDQhLLPBnWYcZBlTJZt9VECG5DIDvYHqaM0uMMfiINlbHqplV68OvvlxtpSlYAAG+KG5GtPY+JRWK61w0KQn5ENhciU4lrX8rXc0ulhUc9pFyuXUx6qIHcVc58kOvqipZB2R0ViurlLFwwg12PScqdQzPai/BBMmE264hOQSkHagaoKuEjA4d8tK9vtsGQ0HFw20ZGBpqR2sGo5ih+2WG+H7SlWHiWCr5VBWK1G3izUU4OPZKV34XuIZW7a5jbyQPSkr3/enkAbB1FBh4I3FSdw7fFw1LdaDqkjPoXnFKF6O3UGPrTDiJ0hiRGIEplxokZGsYzXRUqfE6aviQLcxjejCQXu1D9jnBmOEdBnc+a5vJr9+Y3GRDn5zpSAFbfWk9m/E1Kcw1Y+EuTaYhksGU8slZUCEoHgZV/tT7RlvbPnuMRUpBMfrfiJDK5TURKU74ZOU/5bmn1J1GWxj+Yi0eo+Fz/mU3rmA8hQuaYyVHLSFshba0/vkeP9KL1jnTf6jVoHXBTJ/nBH/tIr3DtMu2ybjOaaQ7FSVqW0o6VeTnGcecinErYmfmJWyylsfEy2TxCqBmPAa5TYOWQHMYH+LHWhas/aplK8kfcVjPwreot10i6cuRJQMMEp6nHTPTPtU3UK+LJtj+3NepPG43nT727Dj8PpDCFlBUS4hxIzgkgp0nHgGvXfp3Dt9z4zOcLGxg+IFvXE15I+Df58ZS1BTjic69I6H7jtTlQsgC+JQjIvukcGcqzx0Sozi3C8SQhQIyR1z/APqpeTxC69c4jXtFq4PxGa1XOZc4ypjK20IQMqadVggDqfpXGH6V5A+In6fPz5nl8v8AE5i4wiky1o0lTurSM9wDjJ966x71L0CzoUcUKAzNofEBXK8QOHm4v5jES8l0qDi0Iwto7YwR5Gf2plVBtG4Nt/TYJhKycT2CWw421fIwWvZIlBTWAQNiCN1fxTF4tqZireWGIwIC4osbalm42MfFW9Z3U1ulKgdwD3FCy4OJ0eNzAa/d5gkXKNCdZY+GXzj1SE01OIx8yC/mhmwI521xjlBS04WBqxijWplbEWjeqciEfgL202JkFOpLhyWFbYFQ8vgeq5ZdRVorLeZFeeK2rHFj/GoUuW4fW2ynVyx5NBV+mN6f/c3J2Yg/tF1+4W2+cTc6RIHKbbBAHfNaUt4teLNxtb/+mH0T2Snk2qKAnzioX9a/Q0IZV22TF3in8xYQlxxRQME9eldDjfpwXz5mdVrGYsx74/JC0tLKlNjUopV2FdA0NmF64I8Rp4W4rtsySgSHHklsadK8HV7U30ABkRH1DE4xPJXFLEO/rigLS2pzDYCTnf2pdlHYR1d3TUcl3KOWOXIYWp3HTTnIqdqgq+6PqZnb2yGNeLbPivRIj3w0gj0BzbVULlWBXGJf6NlbCxtiKzMi7RX34y+YdCsFW5SaS9HUBgJ0GspcAiF27Wm5QVInIS7t37Z8VN61zP2TwJKzqpxEzjngx62FmfaI63YLqcKCAVFtXv7V9DxLu6ZYyCy3DYi9Cc0NgdDXrkyZ06nyonbr5KutAtcrRsTd+G7kj4FC/jOYlQGA4RjHfQnrj670K8gIPc2p8xfQzNoTyXcEKfS9EbU/FOQ4hz5c56j9qms5J/sGV+YyqgdT3OD+ZUkuynDriHVlHpjrwAf3x57VKtpZvaf+ZQAiDDj/ACIDizE3BqXaLmt6P8QlbDgUdJAUCOp+vX2rpcckHcTy1H9u5nyY8gz/AMvksF6RGOlEpkgJWkHYntv/AOGuiWTPfM5wDHUc4VvvlvYaQubGhpPyANoczuffbpXHu41dthLDP+Y9K68bhm2m7zpRjJmFxCUfqrQAAM7AjTj/ADpNH6dWWI6/7MKyulVzMo4hTxBNv5hXSOZUmMos6igjWkHZXXG/Wu7UlVC4TQkfps3gTUfw6sri4C5t2Uh5fMDLTOfS2nG+/cn28VnstPb8Sgo1I6fmQ/iE+xaIjbFnRiWd0qSgfpgnbVnzS2pTG/EYlzgYx5ilN4uuTvEafzmapMZh5OY7aQApPXA9j5yaZgOm9xOSjYzHwM2S+QUOfCElaNS4rxws98b9/epF6dsLox7Bsb8ROsyeFW0yIVxszakNrJL6kFLqR/d1J3GPNUC1l++eXjpZ9vmONpl8K2mGHLfMl/DpcymIshSdRHTOM4qZzV27ZyR8SwcTlvivqP5kjkGx38/EwYuJex5aho/Y1v1yFgDoyazgNx/+54/Mo3STcVOBowozWgYbTrGSKbczsPZoxtRoq+05nTXEN/SksAocSRjRjcVL05RXAaeB4vfLLiTQLWoW6VcHY5S662UqS8Aa3jLbShLRXIWt3AUwH+H/AAzGXKfcmMhzCtlY3P8A2pZ5a2WhGGRNdEpr9vmaCLTGZJEZpIHZKhgj701MKcARTWMRKF4tFrmtZuTnLCRjBcAFUqWG8RTKIuSuBOG3YRFulchWrJdSrVtXnvCjZmpV2PiDG/w0tkVxibBuy3HmVcxKVhOlZHmiF4dMKZ70AHHYHE7NxuMwPsyoURh9pz0vpR6sewqX1mQ4zmXPVxWUMDiGm7mlNrbjJW89KGd1J3yfpU78nPjZk6XLW2FEWo1oEi4ByTMa+NRq0xkowEe5PmnAdlwdGX/WsEwBPIcu9InuPtvoU6j+0TjYgHfb6UfXEl9Tt5jXAN1nsJ+EaZLTivU4gYJB9qjZHZSEEqSyisZc7lsT/wAhcRFlNyA04QApxSQhJNeSpqz1yYq11vPcRRu3BSrxJmyrEpAebWecxnZSu5HjNW198YeEOSlYEz+ew/Ckrjy2FsvIOChYp6iWrcGGRHk3d+C07c1wkr1r0ssOA+vAxqJ8Vzxx6y4ZpGzsV6AwrZOIpExYfENDalDGrJ0oT9O1IsBV8JGCtOuCYzx7pEkllpwIXuQr06jj/Sp2sTSuPEUabFBZZ7eYFyDSnoTbc2GnAUwpGfTnwetU10WHLo2QIFN1B9l2m/MAS7Rw648tx9yRCWoDdCiUJBPdJzjxVSP8WDE81T47JvEzziJTb8tcC33KOmMwstanHcYA/q3O/wBa6SKFXInNfszYJxGL8NPi0zJFriXMScDmKW26Q2kA7EfWvOMjWjMTR92xHKbw5GWstmfy1up/X+GGp9321dhU5C+GO5bW7hc9dfv4gibdkQWmocSO5Hhx1gJByFKORkk9j1NLst1hdCX1cdT7ickwGbqXpL5mKed1ublRBykfLke1Teqc+Za3DRlGpatVjWp1uS4I0mIwr9MzG8KT7JPWltd56f8AnUkuqpUYPn9ock3WLNjFmPFeflNq0BLLZKkq9lDpXgxI2JIK+pz8QRfmJ8NEdx6OtJfb/wDkZbBG3c9a8l4tHtbxCreoEnMoWq2SJsR+XGSgqSnVpTkFRSBjA+gNMZHbWZUvNVDnEs2LiF5iS1G5aW9TiUr/AFNyfG9R3cZgCVO5tltdoPaM90fs713femRyy/CGzmNlnGT/ADV/GdmHRvuxOPgIuZDB4otF7uMeIlaCW1ZUQMb/AFqzDrsz39Jgd7l3jGTIZtT8jmKQyj0JQ370Dknz4h1qij95DwfcUM29pUVoFLm6lLXlayKkQpW5xqG1DMvaMl9uUiPaJEuA3qKGyvoMJNXj37Ejx1OG8z893WXJuN1+KlXMvJWoEJ6Ek/0gfWnIdbEW4A8GaxwtaI0u3sLlXJbY0gLi6QCFeD7VDfyaFbD+Z4u64Czu5R7NbAp1KUOFw+hAc2Ur99qnCgnIOBKaxe+m8S9EMCYpleGo6myTISonKUp7Z6YpppXRxA9MAkeYA4y4qiwpzkXh1plcwIS4otoGp0HrpPtVi1Iw8RRZkMRGZUl9ci4x5Cwkn9RtWywsHdP80FlKKARH13MdSeBLmwm3JDTi1qSkq5QO4Cj0PtQCvu0YzBUOZo34b3kyrMph1tyPKYJCWyeqfahcCsaMWQz7MKcVMQJtvIn6GEoIUl53B0qHg1K1vwuzCR/T3O7BCLcUrYW456N3hsVjqBn70NFN2y4xMPIWx8kT66WKz8TsIYuUfDwJKHU/Nt13FV0Mdr8iExao5XxMhTNliG+2p1Ska1HlndII22B+lJtALBZWugTPbQ7InM+tS06TnB2zS+QFr8R1Vn7Rytqy22XkqUnT42Ncr0i5Jh2WfEYrXxDLdXgJ0tp3BycqqzjNZnXiR3VV+YJ4yuLaZMZLzHzj58YCsncZ9sdPeqVDMD2h1KAPaYnXLhKHeZPxDThbKvmBGM+9OXlmv2xDUBjlhDfC/DjcVp9u3XBKXzssI+ZWPJre9luw0aPSpxlIThz2rW4GJSHWZx1ZeUchRxkEeelKUBAe3mPsBvGV+2UblNn3zlxUxMuhIL76MJ2ztqJ2SaYHstXxG0tRQxJb/ErS+HZFttbspbo5rh0tpjJ1lSuwKjj+KA1D+4wvqmuboNRjtnDVujTrS5JkyS9pC1NvO6krc8EdOvanYQKMic2zuysc+IxyEyUz347CYLbalam85UpZPX/pobvcprHkxKKhQO2TORNdtzgZnskayUo1DOv71weOvJ4No7LnMWR22pgiQ45HXNkWpwJUwwt1TSPmGASRt5rsmxzYgAwTKFK+mfUmY2S8tXd5M28afjkPBS1I9IIzsCO2Kp5wYFQnzJarWAwYwfiRpn3u2yLdO5KJLai4UJJKFIOnJ9j0+1Dxz0LMRvxGLWXXEBWiDd2bq9ymYullOt2WhjCgn2HmrLLQEwBPUUE2AnxGFuDer9LiNvy1usuI1PJTsEpPTPvUFYJOPzLn6j3DQjonhWCzZkt6EMvIzh5SugHeqrOPWye7X7yermW12e3Y/E5lXi1RrAtm63JsskFCpKfPsOpz7VJVbgemuW/ebfURYXxj9ol8P2bhuLOTOGX21p1srcb06fqk/wC1Ne01nq0wILB2QRgvdkTeWf8A+IwtpwbrEd4AlPnx4oUSu6zIGxFk+iMmJ8z8POJ2GHHFcjCTkJcc9ax/lVA44GyIH1HYai5cZNwvjQkMIWua0sNOx0nBQOgAT496o14+JN438xlhcJOT3NdzQEzWkAlKXAlxvA2zjpSbbRSN+ITMG2YYsNslPttNu29UaKCV8+SAtbivdAOoCk3czjgAFtxS2lTmGpVj4bR+vPbZS4D8rbhI/bGahv5ijVezKPX7ASOOIzLi5FkhrLoScOEaEj7mp0fl8jWOoml2fQiBxLxs6GlttqWbmtekkJ9DCPAz1X711+Hw0pXPyfJ/MSQw1Gz8O5dzRbgZEp7BIUUuZVgYwCT16Vz+dynNuKjOnRxlSrLjZjsmYp1ZSCHMjUktp2ptXIL/ABMalcZn53td2XILbbyzzEZ3P9Qq2+gDJWJ49/YdWjvb4yZEZDjJKcnsK5TqzHEvWz0zGppCURuWcHbc09awFxJSxLZnKpDMdsAOpbx03FewAMCe2x3Al/vcd1sNIebUD1yNQH2rcN8CHWFXZMUnX1AHkSXirPb0pogv5Ed6i4nlukS7fKS+zJw4Dnbc0bEY0I43VlcNHG0cTREp581brstoKdSSAe24H23+1ITv390TaFKYr1mCuJ+PHJOlq2x+SXiVOKGMHfG/k7V0FXK/gSMAVkfM+b4gU5ZrbHckLWtD+tbROU6c9CfrUJTBP7S6pvd2MaYHEofvsAOJQGgsDOBlO22/7Uqx2wGJ8QnqAqZV8mWeJ7smJd1upWrbTp0nY5o8hh2ETSGWvqZSufF8RCyy+484sfIdiEHAOQr714K2SZ4IvjGISsvE8KSv4ZKfU+ktqQoAKWcbnPvSrrLVsV/gQvoy9ZceBBfFHDNqjTUFuMUl1o7sgJGOxOSBnJFWWW4CljqJqqF+eo90gm25t3hIredBcYlFCVKTjlhWk5PXvn96JrUwRN4tbvf1x8QhFu0K32lw3NakvuAtOOFzI9O1LPIIXAGTC5FXRvb4l2xNMyIrkm1oecS0oqdcdXoTkdh/FJrutwXZMAfvFlwuO50ZfU4j49mRfJ45DreI8ZKdLYP+JXmvJavIAaw5BmCwBCKBj9/mZpxg8+9dwzbWoKI7XqS6slWgnrsdtvNX1WVVr1USa1bXPZjC1gsrjMWIt99El11XMW+U5Ok4BA33xUNtjcizGMCZVa9WlM0i13CBAQmNDQhJA3Gwz/3q5bEq0dTGpezZk790TpW6+kYTvqKgAke9Gt3qHAg+l0gGF/w/Omvy7dFamzYyS4VpGlAV41eaJMCZY2gJDcuOrRZoxblR0KuZSC5GZbyNXcA7Z+ppbOX8CH6BU+6VIPG9uvjqI862rhl30oWVZ3x0OOlIdEb71H8w/p1Pgwwhzh95YQlgMuDbUFDCvcVi10g4VMRZqdJxdYtrlIEVq7NIUsgaQvcfYU2wKRgHEZU1inIWJrnD1liXF1BfaceH/wBziD27CpnuUD08mdCvj3P/AFek8t7t2jyQlopDG+hKiMFPTJ8DxUxqCqMHzLbDWRgjct2+6NNXNTapEhD2j+1Skcs+wH+tMqCoMzXrLV5wD/5mRQbY5IkttNAhajsR2966rWjE+cVN6miRESIsVDDLmClOEnG9QnGciV5ONz5dvmuN+uQ8rPYrwKU5IjBiD5FneHzNlX1OaH1CIWpSXasbcpST9xRi4ieKgzhVlfSknDiQe9F6/wCZ70wfEhNtlN4IWTitHISe9IzhlqYxIbdxnQoHGOvtTBYk8K2Bk18taobrJg4caWkqTt8oJ2H2zXkurcHJnmqYfEHKEhIyYyhnoR2pnsPzM94+J6zMeYdLquaVY79AfNY9asOsMWOvkSz+aF7KpD7pUR/Vnal+jjQmG0ys46y6cc85HQE0wKy/EDIJhWNNS6+sJUkPuNaEFoYJWPHvjP3pbozeRKqOWaEK/Bh9iNcbw5FiSLm22A0UEOOZK0nG23fp/lXvT9FSzDMku5m81aMNMxm+E4s1xbsmW0lsIDI08rVjYHVkmpyfVsyy4/eZVZYasKBn/cAcHKmcS8SNLvLEWNFaBdQOVpORsB13P1zXQ68ZRgHeMRXflHZmkO2CSl34qPLbXCbTjkNHSkefYn61JyOD6ino2jMe4EBSuDE3iJ61zJrTHEbNzhpbIDbqV4bKSc5049W+OtJ4FX0ydSM5ln0JtTNbjP4jhbodnltiYtx9MdKCUrStTSFBP+EHBGPauhXy0YkEYE5lnFsQ4PmQ2z8muE8N2R5YeQ2FDWP0lEdT5B/ioLql5Oa6yVJjGpepctPG1Qos1aJURhx5ZOoKHTfGx7VzfV5CP6Zw2Nb/APmZ3sJCoZ3d7LCuTQYfW43FV1aC8pV9wQf5pv1d3HfLV/8ABzGlrCMOMyBqyR7ZHLdjKUNkHISdJUrG3XY7+aMfqNFjAlsGeRh/cIhRuGLqZJuPEzzqOWv+z0oeOgb9dzg79DtXUHMpbCVkGeWsM2mhEsswwXIMWEUuL/QVqOtQJ3BSSRnbrSO/caMrrQA5KyR0QHEx3YelgpdIlJXkaeu2SSOvsOtY2F2TmL6nPiU5cx1M9xTMMSm4rHODrKkhxA3zqKRsOwzv1xVqBCgONycq/bGdRKeuDshxb5UoJUdk6sge2a30lOjO1RyWrQAQ5aZ1yYaIUiUYzgwsltWjxucf+Yqa2lcSo21XefMNsvNtTkRmNK0qQS48g6d/AJ61G5HWCoynbxB3DENJLjukk7JSf86t3PnvEbI0P1Nkgdazrue7ahpqIhRwU4oukDvLH5Uyd+n0ovTE96hkqbO2euFJ8gCi9ETPWMr3O0NO6UtoTqA/pGDQW1ZGoVdpEBOcNnm6SpRHuBUR4pzKheMS2zwZEdWkOE9M4JxVFfGA8mKfk/iev8Jh1hDKSByydBz5/wDBSjxMWHB0YY5WVlRnglSn9Lg1J77UxOKSdmEeZgSRXAaVLWhS9wM6cjNEeIRnBmfW5GcStG/D8yWSrVgg9htQ10WMM5hPykU4xEaUbU3dn7YtLnNjvcokAfqHPUeKrHGYD7pOeWMn2zRkcBx41scNj0B91spVJIytOU49Jxt1P+9F6ZOMNkRfrqQewmccQ8M3Th+zszH3iy5CWY2pvYlCyd9jnp/n5p62ZbBHmTtX1XInnB0x/MxYLRQ4hGpSshJ04+2dz+1J5ZPtJ8y/9NHYss0/hqNbpTapLD0eRK0lT0gH1avbPbtSgEYxt5upOGzE++3lyw8QPtW2Q621r1FtJ9Gsncgd6ThsnrCexSo7iXv+JZ81lpTMdbuhwLOlBUM4PX2pZYk4iVesH+YMlcWolGQIig9c3XEstx3E4Bzgftk4qmrhg+5/mBZywB0T4jhwVw9IjR9N+t8i3yEOEpcjvJUgpH+JJOB9aOzj1+ZP69g8QhfrrbLDpm31LS2EKwgKAWpR7aQOpPX+TXD41V68w1nDZ2f2gOdAxZ/4j4e4heWLHMk224LBLDUlOltzHjt/IrsvwlXeIyvkNnqZftUuQost3uKpLyTgOoVqbUfZQP8AnUT11ds4lq5wcQlfY5nQ3EQXEalDJRqKdeNzjtQHj8fsGrUA/tAqyhwwzFm2WGdPkNpmxVtJbGoTEfp6vb3plrkJkT195TPVo32CzG3LdS8yy6wPUhbiQMHyT5ouGmyzf7knqd10dwVxPaWZjbECzykW9tAKg3GSChR8KGDnvvVwuCkAbjBUWGWPidwOAm0BtRchl3lqJ0s6V6iOv/oCl21PYc9sCUV81aVwFyZm8niC7QedClBwoBKdAKlFB7Ek/wCnSnjjVsPOYq39Ru75AA/xG/gu7rMpuPe7XDdRJSVR5DDadJwN/fseoHSp+RRUKycQPWsY7b/iRcJMpVZ216d1LUSQPevAamExhaRhacAjBzmtA3BJ1D0dvIGcGmgRRMIIYSoDttR9RB7TxbIG+KwiaDOOTqVnr9sUOIWZ4qMCdsA+4rMTwaWgzhvKeWSBuT2pnWCTOQhtSCHHGiRuU5xWkTMnMV75xZItLk1uFbw9yQkpe5gAwepI+u2KnNrAkASpaEZQS0UIN9lrvRmLcdVzm/StRAwT0/iksxzkeZQFXr1+I52S83CVaG+SlBUSoEOpwSP8yadU9gTBk7pX2JMBOcL225XQSXrekSXFlXNKHBhScb5z32/alnkkZ3n9opzWoziMVxukwpfhRF9WSQtAGGzjYVH6nIsbCHR8/tC46qzB2GoOesa7pYIrN3cy4ApLpUT6wO5/j9q6fpkIP2l3rJ6jKBkGZg0xcIsx2wWkLkttvlYARkJOPPissIdQTGUVJRZ2A1NGtlqm2Vkql3MABA5x0gJT5+njbrUt9nQ9V8yTkcsWZVVlBly23DiJkuMKmsqQordUNkkdPt7e9KqrJfL5xJ1rJGWjMGbJAkoJlJjKdyQ3qSEq27Z6CnWcCq09lYiYUwPEH3ThSw3S2IvDqTzknWFoKkFRB23TRItlNeFaEqKX6lf9w5b7xN+GYcdZDyFJyTjQceT4pdHIvDYbYjbOPX/acRU4x4XTxxLQWboITcXJXrbLmSdsgAjfb+a2zmcbiWF28tJnVguIO4v4Qci8EW2Fb0tPS2ZCWzJSdOgdQRnpk4703jc6q7Lg/JmDLe3EKIvFut074Fw6pjYSlbhVlDnk/wDelHbE/wD5OglbFRmMHEfE1t4VhRX7hDXMTIVoKWAk6QRnVg4q2utB5nPYuTqZw7+Ij6OJBKZSGbJ8rcZTOlRGDvuf5phorK9SILMx+Zq9ruLdwtSX3Wihh5AJbUNXUVAUZCRnU8lbdsr5gR6xvQZTC7HdPhVZUp1UhBd1DskDbA+9NrRUGvMt7PZ941AipPG35gfiXo6mD6RIjthWR7CsZse4bjRVWcL4lw2hN0tAFxedRKZcVqdaSEqCtx4+nWlV3suT5nraVZgogzhe1/kUxd1ukx64lOUxwRs2k98ecUV3M9oIEUnDPbBMqcByEu25xg/Mys5z4O9NWKMbCpKU433/ALoo4GDL1vmoWeXncdsb14GCVhRpwFJ31ewpmYGJIjA3JUj3r09Kc29sMfoMvt889AoZGO/cUl+Qi6zG10M2yNRYuN4vkx5BiS2mNKilIQBhXuf9q5lnPfO/AnXo4tAX3A7nPENx4nkQWosdDIfONSmV6Ssd8VdXc1q/iIHHoQlhmJEqberdKC5jdwayrYLWCFfcV56n6+YDEEHrJmOLm7tM/KptpcccKtB0DJHufapvobgPUWyQgv2wIfd4NipjHlsSVtg5KWHcke2Kx15gPYARxe1dESGHcY9ty1EjO6gcanXSVA+Pao3a9j7mxFlrTqGmZd4uyQlnLbf9WgY/915KrXGDMHHHlpYF6s1iQoXZ1ba0JyDp3Ua6fFCKRWI11ZEyJ1D4tj3JhLaADzxljUN1+31orbLKz1MdXWpX1R8SzZIrtphvpW63qKyvmBPqSk9vekEn+2Tci83tisai1f8Ai+w816y3NEhSCcLU1gLBPito41zt2b7cwEBq38x54ZtdojWdhFkUFNLTqCzhSlZ81eUx9vmYbGLZaUeKeFrZP0S7tbQ6toYS8h1aNI99KgK3LKNiMQq5wDCKLjCt8KE0vQlC2ElvUvqE7d/tQ321rjInkoZ2OD8wfcrwiTEW03GQrWcfoq9XXpsc4qQ8hTrp5jvQ67JikqVdLS85Hdt8lBdXlBS0SCOwrn8r9Oax8mLPvbzAFz4vmhBRIUEBS/TpHQpPQ/xTuP8ApyoQV8x4VK5ZtHEEUuIcu5bCcgNukAqz7nqatVcmeZtQ07KVcoc1sNFxxxBRGda/VWnIG/3/AIp6ZQnEBVFgBPxE7hrgSTLvpcvYU8zHOVt69j/1HsPavWczAwom/Qhfcx/gTVZtyimIlEOcEaEBIQ0kDeubyL/7g/8AiVUcdg57LqfRZJDLynNZfA9JWrJ39qR67BcnzDdB2AGhJvi5jUQJnNNnGMcs4OKY19xX3jUV6dXb2GKl2uTb90MeG+7HkIPyEZ15rfTAXuD5lFZKjqdyS4RY8AtymXFBoq0kFWwODvvQInc6M31jjDCI/Dd2/KbolxzeO56Hh7dj9jXTXzOURmas2popC2xlK06gob5pwityq+lxDgdaAGOwPWhOoQ3J3Lq0xHS87jB7J60D3isbhrUXOBF+XxW+48Wo4KQDulRIqJ+Q52ZbXxFxuLkuXIVL551FeNlA/KDSAAw3Kl6qMS/bUqLZWFKCupOaluxnEaH3HZiXHk2speTrIGElPUfeqk5airY3IrK2FmRIVxra6023MbVIRr9KV+qsblkAHczqzE4hG1O2SNJX8Ewy1IxuQgBRpic1AcHMnt41hHYyW5oRHDc1hsHSr9UN7ah5p/rkEOv+YVRLZRv8Su7brRdWytBRqO/Xv7iqwtNozFsLEOxFmXG4ltI0a/iIgUclg6VJT2270qzj6IBxHq6+cRB4udXMYcktvLeQkDdXzBXuO1M469CAYnkN2U6lTha9vRYzJSFrfjPlSUBvPpUN6ZzKe40ZKtjNUaxNE4buM24PuOym3m0q+TmlQA85HioaUNftzmUJX7B2lqf+G9suVyE9M1BStQUttJ6nvg10lYBQBJWznc0qDCYgxWmozLSUJQEpA22+tHgCIJJOIO4gudthsFE+QhBO4bKxkj6Vn3AgxiEociB7QzZeKLeEOtIeMRRShXUAHfGf2pZqDjDfEoe5kfKnzCUXhKzR1ofENhKkKyklAP8ANeFNajJim5DmEnWmgRqXr33yM/StZk+TFrZjxELjjgCFcXzPtqy04d1sFJ0OH/TelerUreYXrkrgxEicB3F1bhucVa2lBSCEI9SMdFJGaoqsqf7Is2E6h7hbht6yo512kSmGlDSAolKinwMdOlQ8nv2yThZ2ONYnTCDLfv4nbvEpRzbfbUBhrVjl9z7k9657d+uc6M630w07nJlhKkpw248WlEgkAYzXOIP4mBiTkSKfdWkTUCG5pWPSdyNRqtKg4yYvBC7krfEEmMpyLMBUpZy2sndGfHtTcWdcLFmqs4YT6Fcj+clcvlLbdRsCn1gj3oEchMGbbSOvtg/iSSmQ78I22Vp1atAVtVdY6jMmOBoxSkxdAJAzVuJBGLg/iIMJRbZ61BA/sXCfl/wmtDQSsbZkhfIV8OUlZHoycDNC5ONTUG9xNk3iY2sty8pWj+nAxUhRs5lo6/EpBxTz3N14UvagcZ8xlbYns6UYyUBnDpyQop3xXkpBG5nbc8Sp5SQ666UIIyEJOKwqFGAIYshSBdJCGVt6dLKd8560l6RjU1nB2ZUN7cnXIBlxbYQNsHpTfRKJkwVsXOIYtl2edugVJT6UdVp21VPZ1ADHcoI9uI6xbgxLbUlK8IG5B8VgsUnUjsqKjJ8ys5Ft7ii8jSd/Xp2xS3IJ7KY6t7FHWQMGCXV/BS3lLQfkUcpp/cAZDRp9TrhlGJTuNvhS0lqbGSVu7hSU4zWJyWVst/8AU8KlYa8TvhThay2xElkqS5JfOoBX9OP9K6yXC5erGc22lqz2QaircYPF8G+Oot8Uu8xWEqSr0FJ856UVdFKDcCy21h41LT8ria2NsNu21xlQWCpSBqSd+xo7VTplTBo7u+G3NSgRXnYbSw6EqKQrdOSKctYZRgydz1cgiIP4g8GXLiS4CRHk4fZbISFJIBTnpRDKnBhFVZRFng+ZxLGkN2BlwoQ24VrBb3VjtmgtYspVDuNroNZ72DU2+DHmuWtIkq0SCn1A9jShUzVdWO5NZYnqa8SqbZMW2oPyh7aFGovocj3n/c0msnQlBiO5BkHW8Xz/AHFKOKTXXx6n6nOf5lHpK6+Jak3Nl1heU4KBuO4+9PvZXrPWKbj9ZRYkxrm1yH16kL2AVvvXO4vJ9T+k5mJY1LRWvPDrEB+Q9bdSihIKs76TVFyEHA8Ts1clnA7wY7KblMtme04jcALTvSFVe3ncpKlM9YdjWuItxp5oJUU4yrrtTOqjwZEbHwQYJvzDXxSJKm0ONpXoGvpRHt5WFVnrgwS827LubbloTlJRhXhJ/wB6cigLsbgvcRqNFnsLUdAXJJDit1KVuSactYOzJHtPiKkmJ1BSKpiovToikKPv0oPBmjcuWriJ2JpjzFFTedieoosZnhCF3S1PYS40sKI3BHWgMaIua3Yji3F61FQwAT0rMB8CEGxPYT7SVZKvm3I60FiGGrAwnzUSsIKjp8VOQVjBOLpN+HaMdGoAjY02pMnIirG9sA2l19dyBaVsNlVbcq+ngyOpm7x4TMbjsJaXgKJ6+a4jVsdYnWD7zL8a7NoQtLAKF+fNJ9NgIR93mRjiflrMdLW7g3Jo6+MVUn4he3M+evTcB1JQhehe5UkdDXk4wtbOcRhfIxDc26uSWYaUqQGSnVrV1rLwSOh8RVQVST8ya33u0+nK/wBTopSqemKwMCY9VjS3IuKVvf8Aw54Sr+6elee4BvMytMDDrPhxHOgrLdxiofYOwUk9RVKcoqPd4mtwqbR/TODOmr9BDiS26/GKjjl9RWC1A3ZWxMbiP1wQDDEi5BhpITI5zix46CrjaFHYnMgWns2xiVIt0YjOrU3FbQ7/AFOkb/vULc9VJwI6zilxgnU6Rdyw44qdJcUOvoO1RjkvWcWEkTzcYMMIJBcOJC9HLkJ3KE/NnrXruTYw9ph1cNUOHEBR+ITJBLjmFBWASetYyllDHyI9qgviRzZbxedfBShogZJV1Newx+3UWQAuDJYrvJbadbI9SgUjNSlOlisJzeQBnEZn1MqYcC9i8n1H7V1nPtz+YdWTgfiZtOTJiTVoQoFtKiCSMgCpkUf5nYW0FdyRV8W4ER7a2tSwMegdaYtBOzJ2sUbhGLZbjdFhV1WUNf8AJT3+tUKuBgSZ7gfEZIcGHbGdKUBOkbCmgAbMnZi0EXriBtCPnSADgVjOToRioF2Z1fLd8MogpHt71Wy4kqN2kLXDcO8Wo8h3RNRuNWME+K90DCZ3KmIV3s70SQtmQhSHEncEUgkqY/TDIgtl16E5upWjwKLTQdrCSJDUoA7HPmlnK+Y5SGlZyzhRLkdwZ8CjFoxgzPTPkSqr4yKoegnHei6ownu7LJmbohadEhAO/elmkrtTCDg6Msw5EJhatCEpJ32oH9Qjc1VUGQXuUpejRt7it4yfmFY2BqXbRP5relw5UmkcinByIyqztCLHJLyVPJScdDUzd8YEoGDLpSwpKi6nUnPpzSQWB1NOpG5LJRsVBLYwB2AoghPmeDZlYoQ8gnIIO+U07awjYR4lphacaQ4ErHQUhgScwhaZajXKQhCmVuenwsZrGGRgQyUPukouSJDiEqSnUDjIoXRusDO8iMMWZ8OlaQptSyN8714WPWvUbk7L3O4v3O6r+JLCTpJ2IFeWov7mlVYVJ6ZDcZs890rC+vevFGY4EW7djkQRc7m1EWlUcktkZ0iq6+MGbBg+rhdzluRHk6H0KACt8eDTbaAmlMFbiV2JHMuPMyyo6mwcnJ2paVMNwTYsuniWMyy0GU6lt9AKEcZycxDrWxyZJ+a3u8LSGUKQ2BgZphqHycwgyr4l6Nw6p9I/MZi1pKtSkA4yaYqgeIp7DDUeNb7akCOlKfIAoyPmKDEyGVxKiOkp1hIFZ2mivMXJXEkqYsoiIU4o987CvEE+YWh4nkazrkKDs481ZGyT0TQl8aWad7M1fiD4NMQ/FIB29PmutYQBucusEnUzxUoxZKlxgQnPpz2qT1MeJd1yNwZcHHJaiqQSs+TvS2PaEoxqBZMMHsCKXnEPEGOwXG1amjpPtTBbn7oBQjxOUypDJAebJx/Uii6K3iYHYeZdZuKHdlaVJ99qAoVjA4M7cZgyBhSQk1ocieIUys5Y21jLLv0pgu/MEoR4ldyzzUj0HWkUYsWD7xK6WpsYH9Egd68ejTwZhOfjpKFDUlQx7VnopNF7AwhE4jcS0WnhqSD6SR0pFnCUnIjU5A/unrV4SSduvY0J4ph/UCdC8oAI9IzWHjGD64kYuwS7q60X03thDkgSeXeUyUZCgj6UK8brNF4kTF2bZIO5Pk1rcYtN+oE6N8WXAoKOB4rPpABib9TPHryt9zUW1ah3x1rV4oUYzBPJ/E8VOlvYwysitFCLM+oPwJ6li4S1YEcn60QVFg+o0tN2W5dVAIT0wKwuszJhO3cNJUoKluKPtSzZrU8AfMPRrZboSklDSCR5oOxPmbiXHZzTCCE6Ej2NZ2nusESeIGUggrBV2AyT/FaOx+Jp6iD1y7hOJ+HYUlJ/rWaLQ8wM/idx+HXXzrnOKcP91PSs74+0T2M+YyWywaQA2jQnp0rwrdzkwTYqxttlgbQMujfwasq44A3JLLydCDeL3VmYG8+lKdhR8g7nuPFF7dVRyyU3+9ezPSk5QGFIiAdjWTxkDjSCcEVoOIOJRkRWf7lNVzBZRKK1rZVhCjj3p2AYvOJbjyXSB6qWRiMUwg1KdwPVQxmZbCyUjIB+ooczQJIllpwetpB+1aGOYJUSJy2Q1dWU0XqNM6CQKs8LB/Sx96P1GiyokIs8LV/Z/wA171GnugkibPCz/Zn9696jTeonf5PC/wCV/NeLmb0Enbs8L/lZoe5m9RLbNphA7MihLmEFEtC3REDKWU0BcwgonSGGh0bSPtQFjCwBJ2wEH0gCl9jNkT7yx3r00ShInSBnC8V4zILl3CSFbOddqNVBmMSJPboyZqsyFuK6baqM6GoA3GSJbYjIBbZSCO9KLmexCrDSM/KK8NmYYThsNk7pqitRFMYw22O2nKgN8VdWokjk5hIU2JM//9k="
              alt="Pizza background"
              fill
              className="object-cover"
              priority
            />
          </div>
        </section>
        <section className="bg-white py-20">
          <div className="container mx-auto px-6">
            <h2 className="text-center text-3xl font-bold text-primary sm:text-4xl">
              Why choose SliceHouse?
            </h2>
            <div className="mt-12 grid gap-8 md:grid-cols-3">
              {[
                {
                  title: "Fresh Ingredients",
                  desc: "We use only the finest, locally sourced produce and 100% real cheese.",
                  icon: "🍅",
                },
                {
                  title: "Blazing Speed",
                  desc: "Hot pizza at your door in under 30 minutes, or it’s on us.",
                  icon: "🛵",
                },
                {
                  title: "Crazy Deals",
                  desc: "Weekly combos, family bundles, and loyalty rewards that actually save you money.",
                  icon: "🎉",
                },
              ].map((feat, idx) => (
                <Card
                  key={idx}
                  className="border-2 border-gray-100 transition-shadow hover:shadow-lg"
                >
                  <CardContent className="flex flex-col items-center p-8 text-center">
                    <span className="text-5xl">{feat.icon}</span>
                    <h3 className="mt-4 text-xl font-bold text-primary">
                      {feat.title}
                    </h3>
                    <p className="mt-2 text-gray-600">{feat.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        <section className="bg-amber-50 py-20">
          <div className="container mx-auto px-6">
            <h2 className="text-center text-3xl font-bold text-primary sm:text-4xl">
              Bestselling Pizzas
            </h2>
            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {pizzas.map((pizza) => (
                <CardPizza key={pizza.ID} pizza={pizza} />
              ))}
            </div>
          </div>
        </section>
        <section className="bg-primary py-20 text-primary-foreground">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-extrabold sm:text-4xl">
              Ready to grab a slice?
            </h2>
            <p className="mt-4 text-lg text-primary-foreground/90">
              Download our app or order online – your pizza is waiting.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/order">Order Online</Link>
              </Button>
              <Button size="lg" asChild>
                <Link href="/app">Get the App</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-gray-900 text-gray-300">
        <div className="container mx-auto px-6 py-10">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <Link href="/" className="text-xl font-black text-primary">
              NextPizza
            </Link>
          </div>
          <div className="mt-8 text-center text-xs text-gray-500">
            © {new Date().getFullYear()} SliceHouse. All pizzas served hot.
          </div>
        </div>
      </footer>
    </div>
  );
}
