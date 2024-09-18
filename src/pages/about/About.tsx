import styles from './About.module.css';

export default function About() {
    return (
        <section>
            <img src="/Symbol.svg" alt="Symbol" className={styles.symbol} />
            <p>
                저는 소프트웨어 엔지니어를 목표로 하고 있으며, 코드의 핵심 가치를{' '}
                <strong>사용성</strong>에 두고 항상 이를 고민합니다.
            </p>
            <p>
                패션을 전공한 후, 2년간 패션 MD로 일했습니다. 그러나{' '}
                <strong>더 나은 것을 만드는 과정</strong>에 깊은 매력을 느껴, 개발자로서 새로운
                커리어를 시작했습니다.
            </p>
            <p>
                <strong>고민하는 것</strong>을 좋아합니다. 이러한 생각들을 기록하고 나누기 위해
                블로그를 운영하고 있으며, 이 공간이 누군가에게 도움이 되고, 서로 의견을 나눌 수 있는
                공간이 되기를 바랍니다.
            </p>
            <p>
                <strong>자연 속 활동</strong>을 사랑합니다. 등산, 러닝, 수영 등 자연 속에서 즐길 수
                있는 활동을 선호하며, 정기적으로 자연과 어우러진 장소로 여행을 떠납니다.
            </p>
            <p>
                <strong>공간 디자인</strong>에 깊은 관심을 가지고 있습니다. 가구, 조명, 음향 등
                공간을 구성하는 요소들을 탐구하며, 미래에 카페나 스튜디오를 만들어보고 싶습니다.
            </p>
        </section>
    );
}
