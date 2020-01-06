using Moq;
using Retrospective_Back_End.Controllers;
using Retrospective_Core.Models;
using Retrospective_Core.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.SignalR;
using Retrospective_Back_End.Realtime;
using Xunit;

namespace Retrospective_Back_End_Test
{
    public class TestRetroCardController
    {
	    readonly Mock<IRetroRespectiveRepository> _mockRetrospectiveRepo;
	    readonly Mock<IHubContext<NotifyHub, ITypedHubClient>> mockHub; 

	    public TestRetroCardController() {
            this._mockRetrospectiveRepo = new Mock<IRetroRespectiveRepository>();
            mockHub = new Mock<IHubContext<NotifyHub, ITypedHubClient>>();
            //var retroCards = new List<RetroCard>() {
	           // new RetroCard 
	           // {
		          //  Content = "Test RetroCard",
		          //  Position = 2
	           // },    
	           // new RetroCard
	           // {
		          //  Content = "Test RetroCard 2",
		          //  Position = 5
	           // },
	           // new RetroCard
	           // {
		          //  Content = "Last test RetroCard",
		          //  Position = 6
	           // }

            //};
	    }

        [Fact]
        public void AdditionOfARetroCard()
        {
            //Arrange
            IRetroRespectiveRepository repo = _mockRetrospectiveRepo.Object;
            var controller = new RetroCardsController(repo, mockHub.Object);

            IList<RetroCard> retroCards = new List<RetroCard>();

            void Action(RetroCard retroCard)
            {
	            retroCards.Add(retroCard);
            }

            _mockRetrospectiveRepo.Setup(m => m.SaveRetroCard(It.IsAny<RetroCard>())).Callback((Action<RetroCard>) Action);

            //Act
            controller.PostRetroCard(new RetroCard
            {
                Id = 5,
                Content = "RetroCard 1"
            });

            //Assert
            Assert.True(retroCards.Any());
            RetroCard createdRetroCard = retroCards.FirstOrDefault(r => r.Content.Equals("RetroCard 1"));
            Assert.NotNull(createdRetroCard);
        }
    }
}
