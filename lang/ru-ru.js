export default {
    general: {
      create: 'Загрузить',
      cancel: 'Отмена'
    },
    navBar: {
      colaborate: 'Совместная работа / Помощь',
      about: 'О нас'
    },
    ganttPage: {
      tooltipLog: 'Где я могу найти свои log файлы?',
      meta: {
        title: 'Chia Plot Simulator - Анализируйте время создания плотов',
        description: 'Этот симулятор построения графиков поможет вам быстрее строить графики, визуально находить ошибки, анализировать, пошло ли все так, как вы планировали, и зарабатывать больше chia (XCH).'
      },
      createPlot: 'Добавить плоты',
      share: 'Поделиться',
      plotFileSelect: {
        placeholder: 'Выберите / перетащите сюда один или несколько log файлов для постоения графика...'
      },
      plot: {
        phase1: 'PHASE 1',
        phase2: 'PHASE 2',
        phase3: 'PHASE 3',
        phase4: 'PHASE 4',
        phase5: 'COPY'
      },
      fields: {
        threads: 'Threads',
        ram: 'RAM',
        size: 'Size',
        buckets: 'Buckets',
        phase: 'Phase',
        duration: 'Duration',
        durationCopy: 'Duration (Copy)',
        startDate: 'Start date',
        endDate: 'End date',
        diskTemp1Name: 'Disk Temp 1',
        diskTemp2Name: 'Disk Temp 2',
        diskFinal: 'Disk Destination'
      },
      infoModal: {
        title: 'Инструкции / Элементы управления',
        instructions: {
          title: 'Инструкции',
          step1: 'Выберите столько log файлов, сколько хотите.',
          step2: 'Визуализируйте свое время и отображайте информацию на временном графике.'
        },
        controls: {
          title: 'Элементы управления',
          zoomTitle: 'Zoom',
          zoomDescription: 'Ctrl + Scroll',
          horizontalScrollTitle: 'Horizontal scroll',
          horizontalScrollDescription: 'Shift + Scroll',
          reorderPlotsTitle: 'Изменить порядок участков вручную',
          reorderPlotsDescription: 'Перетащите в раздел информации о плоте.',
          orderByTitle: 'Сортировка',
          orderByDescription: 'Щелкните в столбце информации.',
          extraPlotInfoTitle: 'Дополнительная информация о плоте',
          extraPlotInfoDescription: 'Наведите указатель мыши на информацию о плоте или фазе.',
          example: 'Пример'
        }
      }
    },
    colaboratePage: {
      content: '<h1 class="mt-5"> Хотите помочь?</h1><h3 class="mt-4"> Отправте свой Merge request в репозиторий на github</h3><p>Если вам понравился симулятор плоттера chia, и вы <b> разработчик программного обеспечения </b>, вам предлагается добавить новые функции, исправить ошибки или что-то еще, что вы можете сделать в нашем <a rel="nofollow noopener" href="https://github.com/njtnestor/chia-plotter-simulator">github репозитории</a>.</p><h3 class="mt-4"> Угостить нас кофе</h3><p> Мы очень ценим все пожертвования, которые помогают нам и дальше посвящать время этому проекту. С этой платформы вы можете угостить нас кофе:<div> <a rel="nofollow noopener" target="_blank" href="https://www.buymeacoffee.com/njtnestor"> <img style="max-width: 200px;" class="coffe" src="/img/coffe.png" alt="Responsive image" /> </a></div></p><h3>Chia donation</h3> <p> Так же вы можете отправить нам chia/mojo на кошелек: xch134eslk0hfgc7tfz9ncd4ag53kdjrde23ac4zjux6h7dzt9ajgwts5th5w2 </p><h3 class="mt-4"> Покупайте в Amazon по нашей партнерской ссылке</h3><p> Вы можете бесплатно сотрудничать, используя нашу партнерскую ссылку, для любой покупки, которую вы собираетесь совершить в ближайшие 24 часа. Просто нажмите на нашу ссылку и купите все, что вам нужно.</p> <span> <a rel="nofollow noopener" target="_blank" href="https://www.amazon.com/?&_encoding=UTF8&tag=chiaplotsimulator-20&linkCode=ur2&linkId=be332a3e3a1a0f0e24208f689323b4c7&camp=1789&creative=9325">Партнерская ссылка</a> </span><h3 class="mt-4"> Подпишитесь на канал разработчиков twitch</h3><p> Наши разработчики в Twitch! разработка инструментов для чиа, игры и многое другое. Приглашаем вас подписаться, подписаться и наслаждаться!</p><ul><li> <a rel="nofollow noopener" target="_blank" href="https://www.twitch.tv/helloyouagain">Dana</a></li></ul><h3 class="mt-4"> Оставьте нам свой отзыв</h3><p> Вы можете проверить нашу <a rel="nofollow noopener" target="_blank" href="https://trello.com/b/kLCX0On6/chia-plotter-simulator">доску с шагами по развитию в trello</a> и расскажите нам свое мнение о разрабатываемых новых функциях. Вы также можете сотрудничать, создав <a rel="nofollow noopener" href="https://github.com/njtnestor/chia-plotter-simulator/issues">issues</a>, feature request на github.</p>'
    },
    aboutPage: {
      content: '<h1 class="mt-5"> Что такое Chia Plot Simulator?</h1><p> Chia Plot Simulatorэто утилита для анализа эфективности вашего майнинга криптовалюты chia (XCH). Помогает вам быстро <b> визуализировать и анализировать </b> то, как вы строили свои графики. Таким образом, вы можете проверить, все ли работает так, как вы планировали, не зная об этом. </p> <p> Визуализируйте, как создаются ваши графики, и легко выявляйте любые <b> узкие места </b>. </p> <h3 class = "mt-4"> Отлично, как это работает? </h3> <p> Вам нужно только выбрать журналы ваших уже завершенных участков, и вы сможете графически увидеть, как продвигались все его этапы. вовремя. </p> <h3 class = "mt-4"> Что вы делаете с нашими файлами журналов? </h3> <p> Нам вообще не нужны ваши файлы журналов, браузер позаботится о обработки их, чтобы вы могли видеть всю информацию в своих журналах.</p>'
    }
  }
  